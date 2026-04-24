import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // 1. Protect Admin Routes
  if (nextUrl.pathname.startsWith("/admin")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/api/auth/signin", nextUrl));
    }
    
    // Check for Admin Role (If implemented in your User model)
    const role = (req.auth?.user as any)?.role;
    if (role !== "ADMIN" && role !== "EDITOR") {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
  }

  return NextResponse.next();
});

// Configure protected routes
export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
