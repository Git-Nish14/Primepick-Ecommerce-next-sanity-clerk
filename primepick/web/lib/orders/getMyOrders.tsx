import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export async function getMyOrders(userId: string) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  // Define the query to get orders based on user ID, sorted by orderDate descending
  const MY_ORDERS_QUERY = defineQuery(`
    *[_type == "order" && clerkUserId == $userId] | order(orderDate desc) {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        orderNumber,
        orderDate,
        status,
        totalPrice,
        currency,
        amountDiscount,
        clerkUserId,
        customerName,
        customerEmail,
        products[]{
            _key,
            product->{
                _id,
                _type,
                name,
                price,
                image,
                slug
            },
            quantity
        }
    }
    `);

  try {
    console.log("Fetching orders for userId:", userId);

    // Use sanityFetch to send the query
    const orders = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: { userId },
    });

    console.log("Orders fetched:", orders.data?.length || 0);

    // If no orders found, let's debug
    if (!orders.data || orders.data.length === 0) {
      console.log("No orders found. Debugging...");

      // Debug query to check all orders
      const DEBUG_QUERY = defineQuery(`
        *[_type == "order"] {
          _id,
          clerkUserId,
          customerEmail,
          orderNumber
        }
      `);

      const allOrders = await sanityFetch({
        query: DEBUG_QUERY,
      });

      console.log("All orders in database:", allOrders.data);
      console.log("Looking for userId:", userId);
    }

    // Return the list of orders, or an empty array if none are found
    return orders.data || [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Error fetching orders");
  }
}
