import { redirect } from "next/navigation";
import { useAuth } from "@clerk/nextjs"; // Replace with the actual path to the auth module
import { getMyOrders } from "../../../../lib/orders/getMyOrders";

async function Orders() {
  const { userId } = await useAuth();

  if (!userId) {
    return redirect("/");
  }

  const Orders = await getMyOrders(userId);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-4 sm:p-8 rounded-xl shadow-lg w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-500 -tracking-tight mb-8">
          My Orders
        </h1>

        {Orders.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>You have not placed any orders yet.</p>
          </div>
        ) : (
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h1>Order</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
