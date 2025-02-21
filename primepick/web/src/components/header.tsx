"use client";
import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import { SignedIn } from "@clerk/clerk-react";
import { useRouter, usePathname } from "next/navigation";
import useBasketStore from "../../lib/store/store";

function Header() {
  const { user } = useUser();
  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Run once on client mount and add a listener for window size changes.
  useEffect(() => {
    setMounted(true);
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth > 644 && window.innerHeight > 650);
    };

    // Initial check
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();

    if (trimmedQuery) {
      router.push(`/search?query=${encodeURIComponent(trimmedQuery)}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full flex flex-wrap items-center justify-between px-4 py-2 bg-white shadow-md z-50 md:flex-nowrap">
      {/* Top Row */}
      <div className="flex w-full flex-wrap justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0"
        >
          primepick
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="relative w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
        >
          <div className="relative flex items-center bg-gray-100 rounded-full border border-blue-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-50">
            <input
              type="text"
              name="query"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products"
              className="w-full max-w-4xl bg-gray-100 text-gray-800 px-4 py-2 rounded-full focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-4 text-gray-500 hover:text-blue-500"
            >
              🔍
            </button>
          </div>
        </form>

        {/* User Controls */}
        <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none">
          {/* Basket Link */}
          <Link
            href="/basket"
            className="relative flex items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <TrolleyIcon className="w-6 h-6" />
            <span>My Basket</span>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {itemCount}
              </span>
            )}
          </Link>

          {/* User Area */}
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
          </ClerkLoaded>
        </div>
      </div>

      {/* Client-only Navigation Buttons (only render if not on the landing page and viewport is large) */}
      {mounted && pathname !== "/" && isLargeScreen && (
        <div className="fixed top-[4.5rem] left-4 flex gap-3 z-50 md:top-[5rem] md:left-6">
          <button
            onClick={() => router.back()}
            className="text-lg bg-gray-300 text-gray-800 px-3 py-2 rounded hover:bg-gray-400 shadow w-10 h-10 flex items-center justify-center md:w-auto md:px-4"
          >
            ◀️
          </button>
          <button
            onClick={() => router.forward()}
            className="text-lg bg-gray-300 text-gray-800 px-3 py-2 rounded hover:bg-gray-400 shadow w-10 h-10 flex items-center justify-center md:w-auto md:px-4"
          >
            ▶️
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
