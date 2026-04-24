import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // 1. Skip setup check for static assets and API routes
  const isPublicAsset = nextUrl.pathname.startsWith("/_next") || 
                        nextUrl.pathname.startsWith("/api") || 
                        nextUrl.pathname.startsWith("/static");

  if (!isPublicAsset && nextUrl.pathname !== "/setup") {
    try {
      const protocol = nextUrl.protocol;
      const host = nextUrl.host;
      const statusRes = await fetch(`${protocol}//${host}/api/setup/status`);
      const status = await statusRes.json();

      if (!status.isComplete) {
        return NextResponse.redirect(new URL("/setup", nextUrl));
      }
    } catch (e) {
      console.error("Setup Check Failed:", e);
    }
  }

  // 2. Protect Admin Routes
  if (nextUrl.pathname.startsWith("/admin")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/api/auth/signin", nextUrl));
    }
    
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
