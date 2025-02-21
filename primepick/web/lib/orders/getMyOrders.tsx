import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export async function getMyOrders(userId: string) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  console.log("Fetching orders for user:", userId);

  const MY_ORDERS_QUERY = `
    *[_type == "order" && clerkUserId == $userId] | order(orderDate desc) {
        _id,
        orderNumber,
        orderDate,
        status,
        totalPrice,
        amountDiscount,
        currency,
        products[]{
            quantity,
            product->{
                _id,
                name,
                price,
                image
            }
        }
    }
  `;

  try {
    const orders = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: { userId: String(userId).trim() }, // Ensure it's a string
    });

    console.log("Sanity Orders Fetched:", orders);
    return orders || [];
  } catch (error) {
    console.error("Sanity Fetch Error:", error);
    throw new Error("Error fetching orders");
  }
}
