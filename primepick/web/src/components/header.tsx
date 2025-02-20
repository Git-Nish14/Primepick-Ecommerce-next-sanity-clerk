"use client";
import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState } from "react";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import { SignedIn } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import useBasketStore from "../../lib/store/store";

function Header() {
  const { user } = useUser();
  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const createClerkPasskey = async () => {
    try {
      const response = await user?.createPasskey();
      console.log(response);
    } catch (err) {
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${searchQuery}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full flex flex-wrap items-center justify-between px-4 py-2 bg-white shadow-md z-50 md:flex-nowrap">
      {/* Top row */}
      <div className="flex w-full flex-wrap justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0"
        >
          primepick
        </Link>

        <form
          onSubmit={handleSearch}
          className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0 relative"
        >
          <input
            type="text"
            name="query"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products"
            className="
              bg-gray-100 text-gray-800 px-4 py-2 rounded-full border-blue-300 focus:outline-none 
              focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border w-full max-w-4xl"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 px-4 "
          >
            🔍
          </button>
        </form>

        <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none">
          {/* Basket Link */}
          <Link
            href="/basket"
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <TrolleyIcon className="w-6 h-6" />

            <span>My Basket</span>
            <span className=" -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {itemCount}
            </span>
          </Link>

          {/* User area */}
          <ClerkLoaded>
            <SignedIn>
              <Link
                href="/orders"
                className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                <PackageIcon className="w-6 h-6" />
                <span>My Orders</span>
              </Link>
            </SignedIn>

            {user ? (
              <div className="flex items-center space-x-2">
                <UserButton />
                <div className="hidden sm:block text-xs">
                  <p className="text-gray-400">Welcome back</p>
                  <p className="font-bold">{user?.fullName}!</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal" />
            )}

            {user?.passkeys.length === 0 && (
              <button
                onClick={createClerkPasskey}
                className="bg-white hover:bg-blue-700 hover:text-white animate-pulse text-blue-500 font-bold py-2 px-4 rounded border-blue-300 border"
              >
                Create passkey
              </button>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
}

export default Header;
