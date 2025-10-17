import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getMyOrders } from "../../../../lib/orders/getMyOrders";
import { formatCurrency } from "@/lib/formatCurrency";
import { imageURL } from "../../../../lib/image";
import Image from "next/image";
import Link from "next/link";

async function Orders() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const orders = await getMyOrders(userId);

  return (
    <div className="pt-24 pb-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            My Orders
          </h1>
          <p className="text-gray-600">
            {orders.length > 0
              ? `You have ${orders.length} ${orders.length === 1 ? "order" : "orders"}`
              : "You haven't placed any orders yet"}
          </p>
        </div>

        {/* Empty State */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <svg
              className="w-20 h-20 text-gray-300 mx-auto mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              No orders yet
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start shopping and your orders will appear here
            </p>
            <Link
              href="/"
              className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-6">
            {orders.map((order: any) => (
              <div
                key={order.orderNumber}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Order Header */}
                <div className="bg-gradient-to-r from-blue-50 to-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-sm font-medium text-gray-600">
                          Order Number
                        </h3>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            order.status === "paid"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {order.status === "paid" ? "✓ Paid" : order.status}
                        </span>
                      </div>
                      <p className="font-mono text-sm sm:text-base text-gray-900 break-all">
                        {order.orderNumber}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Order Date</p>
                        <p className="font-semibold text-gray-900">
                          {order.orderDate
                            ? new Date(order.orderDate).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Total</p>
                        <p className="font-bold text-lg text-blue-600">
                          {formatCurrency(
                            order.totalPrice ?? 0,
                            order.currency
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Discount Banner */}
                  {order.amountDiscount && order.amountDiscount > 0 && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <svg
                          className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-green-800 mb-1">
                            You saved{" "}
                            {formatCurrency(
                              order.amountDiscount,
                              order.currency
                            )}
                            !
                          </p>
                          <p className="text-xs text-green-700">
                            Original total:{" "}
                            <span className="line-through">
                              {formatCurrency(
                                (order.totalPrice ?? 0) + order.amountDiscount,
                                order.currency
                              )}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    Order Items ({order.products?.length || 0})
                  </h4>

                  <div className="space-y-4">
                    {order.products?.map((product: any, index: number) => (
                      <div
                        key={product.product?._id || index}
                        className="flex gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        {/* Product Image */}
                        <div className="relative h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 rounded-lg overflow-hidden bg-white border border-gray-200">
                          {product.product?.image ? (
                            <Image
                              src={imageURL(product.product.image).url()}
                              alt={product.product?.name ?? "Product"}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <svg
                                className="w-10 h-10 text-gray-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h5 className="font-semibold text-gray-900 mb-1 truncate">
                            {product.product?.name || "Unknown Product"}
                          </h5>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
                            <span className="flex items-center">
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                />
                              </svg>
                              Qty: {product.quantity ?? "N/A"}
                            </span>
                            <span className="flex items-center">
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              {product.product?.price
                                ? formatCurrency(
                                    product.product.price,
                                    order.currency
                                  )
                                : "N/A"}{" "}
                              each
                            </span>
                          </div>
                        </div>

                        {/* Item Total */}
                        <div className="text-right flex-shrink-0">
                          <p className="text-xs text-gray-600 mb-1">Subtotal</p>
                          <p className="font-bold text-lg text-gray-900">
                            {product.product?.price && product.quantity
                              ? formatCurrency(
                                  product.product.price * product.quantity,
                                  order.currency
                                )
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">
                        Order Total
                      </span>
                      <span className="text-2xl font-bold text-gray-900">
                        {formatCurrency(order.totalPrice ?? 0, order.currency)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
