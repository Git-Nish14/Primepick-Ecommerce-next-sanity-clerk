import stripe from "@/lib/stripe";
import { backendClient } from "../../../../lib/backendClient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Metadata } from "../../../../actions/createCheckoutSession";

export async function POST(req: NextRequest) {
  console.log("🔔 Webhook received at:", new Date().toISOString());

  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");

  console.log("📝 Signature present:", !!sig);

  if (!sig) {
    console.error("❌ No signature in webhook request");
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error(
      "❌ Stripe webhook secret is not set in environment variables"
    );
    return NextResponse.json(
      { error: "Stripe webhook secret is not set" },
      { status: 400 }
    );
  }

  console.log("✅ Webhook secret is configured");

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    console.log("✅ Webhook signature verified");
    console.log("📦 Event type:", event.type);
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    console.log("💳 Processing checkout.session.completed event");
    const session = event.data.object as Stripe.Checkout.Session;

    console.log("Session ID:", session.id);
    console.log("Session metadata:", session.metadata);

    try {
      const order = await createOrderInSanity(session);
      console.log("✅ Order created in Sanity:", order._id);
      console.log("Order details:", {
        orderNumber: order.orderNumber,
        clerkUserId: order.clerkUserId,
        email: order.customerEmail,
        totalPrice: order.totalPrice,
        productsCount: order.products?.length,
      });
    } catch (err: any) {
      console.error("❌ Error creating order in Sanity:", err);
      console.error("Error details:", err.message);
      console.error("Stack trace:", err.stack);
      return NextResponse.json(
        { error: "Error creating order" },
        { status: 500 }
      );
    }
  } else {
    console.log("ℹ️ Ignoring event type:", event.type);
  }

  return NextResponse.json({ received: true });
}

async function createOrderInSanity(session: Stripe.Checkout.Session) {
  console.log("🔨 Creating order in Sanity...");

  const {
    id,
    amount_total,
    currency,
    metadata,
    payment_intent,
    customer,
    total_details,
  } = session;

  console.log("Session details:", {
    id,
    amount_total,
    currency,
    metadata,
    customer,
  });

  const { orderNumber, customerName, customerEmail, clerkUserId } =
    metadata as Metadata;

  console.log("Extracted metadata:", {
    orderNumber,
    customerName,
    customerEmail,
    clerkUserId,
  });

  if (!clerkUserId) {
    console.error("❌ No clerkUserId in metadata!");
    throw new Error("Missing clerkUserId in session metadata");
  }

  console.log("📦 Fetching line items from Stripe...");
  const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
    id,
    {
      expand: ["data.price.product"],
    }
  );

  console.log("Line items count:", lineItemsWithProduct.data.length);

  const sanityProducts = lineItemsWithProduct.data.map((item, index) => {
    const productId = (item.price?.product as Stripe.Product)?.metadata?.id;
    console.log(`Product ${index + 1}:`, {
      name: (item.price?.product as Stripe.Product)?.name,
      productId,
      quantity: item.quantity,
    });

    if (!productId) {
      console.warn(
        `⚠️ No product ID found for item: ${(item.price?.product as Stripe.Product)?.name}`
      );
    }

    return {
      _key: crypto.randomUUID(),
      product: {
        _type: "reference",
        _ref: productId,
      },
      quantity: item.quantity || 0,
    };
  });

  const orderData = {
    _type: "order",
    orderNumber,
    stripeCheckoutSessionId: id,
    stripePaymentIntentId: payment_intent as string,
    customerName,
    stripeCustomerId: customer as string,
    clerkUserId: clerkUserId,
    customerEmail: customerEmail,
    currency,
    amountDiscount: total_details?.amount_discount
      ? total_details.amount_discount / 100
      : 0,
    products: sanityProducts,
    totalPrice: amount_total ? amount_total / 100 : 0,
    status: "paid",
    orderDate: new Date().toISOString(),
  };

  console.log(
    "📝 Order data to be created:",
    JSON.stringify(orderData, null, 2)
  );

  console.log("💾 Creating document in Sanity...");
  const order = await backendClient.create(orderData);

  console.log("✅ Order successfully created with ID:", order._id);

  return order;
}
