"use client";
import AddToBasketButton from "@/components/AddToBasketButton";
import useBasketStore from "../../../../lib/store/store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { imageURL } from "../../../../lib/image";
import Loader from "@/components/Loader";
import {
  createCheckoutSession,
  Metadata,
} from "../../../../actions/createCheckoutSession";

function BasketPage() {
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const clearBasket = useBasketStore((state) => state.clearBasket);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loader />;
  }

  const handleCheckout = async () => {
    if (!isSignedIn) return;
    setIsLoading(true);

    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        clerkUserId: user!.id,
        customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
      };

      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Error creating checkout session", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-[8rem] md:mt-[4rem] container mx-auto max-w-5xl px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12 relative">
      <h1 className="text-2xl font-bold mb-4">Your Basket</h1>
      {groupedItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <h2 className="text-gray-600 text-lg">Your Basket is empty</h2>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-grow">
            {groupedItems.map((item) => (
              <div
                key={item.product._id}
                className="mb-4 p-4 border rounded flex items-center justify-between"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4">
                  {item.product.image && (
                    <Image
                      src={imageURL(item.product.image).url()}
                      alt={item.product.name ?? "product image"}
                      className="w-full h-full object-cover rounded"
                      width={96}
                      height={96}
                    />
                  )}
                </div>
                <div className="min-w-0 flex-grow">
                  <h2 className="text-lg sm:text-xl font-semibold truncate">
                    {item.product.name}
                  </h2>
                  <p className="text-sm sm:text-base">
                    Price: $
                    {((item.product.price ?? 0) * item.quantity).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center ml-4 flex-shrink-0">
                  <AddToBasketButton product={item.product} />
                </div>
              </div>
            ))}
          </div>
          <div className="w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded order-first lg:order-last fixed bottom-0 left-0 lg:left-auto">
            <h3 className="text-xl font-semibold">Order Summary</h3>
            <div className="mt-4 space-y-2">
              <p className="flex justify-between">
                <span>Items:</span>
                <span>
                  {groupedItems.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}
                </span>
              </p>
              <p className="flex justify-between text-2xl font-bold border-t pt-2">
                <span>Total:</span>
                <span>
                  ${useBasketStore.getState().getTotalPrice().toFixed(2)}
                </span>
              </p>
            </div>
            {isSignedIn ? (
              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
              >
                {isLoading ? "Processing..." : "Checkout"}
              </button>
            ) : (
              <SignInButton mode="modal">
                <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Sign in to Checkout
                </button>
              </SignInButton>
            )}
            <button
              onClick={clearBasket}
              className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4"
            >
              Clear Basket
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BasketPage;
