// src/middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  // This matcher ensures the middleware runs on all routes except API, static files, etc.
  matcher: "/((?!api|_next|.*\\..*).*)",
};
