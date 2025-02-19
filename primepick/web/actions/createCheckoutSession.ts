"use server";

import Stripe from "stripe";
import { BasketItem } from "../lib/store/store";
import stripe from "@/lib/stripe";
import { imageURL } from "../lib/image";

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
};

export type GroupedBasketItems = {
  product: BasketItem["product"];
  quantity: number;
};

export async function createCheckoutSession(
  items: GroupedBasketItems[],
  metadata: Metadata
) {
  try {
    const itemWithoutPrice = items.filter((item) => !item.product.price);
    if (itemWithoutPrice.length > 0) {
      throw new Error("some items do not have price");
    }

    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });

    let customerId: string | undefined;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_creation: customerId ? undefined : "always",
      customer_email: !customerId ? metadata.customerEmail : undefined,
      metadata,
      mode: "payment",
      allow_promotion_codes: true,
      success_url: `https://${process.env.VERCEL_URL || process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
      cancel_url: `https://${process.env.VERCEL_URL || process.env.NEXT_PUBLIC_BASE_URL}/basket`,

      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          unit_amount: Math.round(item.product.price! * 100),
          product_data: {
            name: item.product.name || "Unnamed Product",
            description: `PRODUCT_ID: ${item.product._id}`,
            metadata: {
              id: item.product._id,
            },
            images: item.product.image
              ? [imageURL(item.product.image).url()]
              : undefined,
          },
        },
        quantity: item.quantity,
      })),
    });
    return session.url;
  } catch (error) {
    console.error("Error creating checkout session", error);
    throw error;
  }
}
