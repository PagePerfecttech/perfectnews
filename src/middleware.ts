import { NextResponse } from "next/server";
import type { NextRequest } from "next/request";

// This is a simplified RBAC middleware
// In a full production setup with NextAuth, you would use auth() here
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes
  if (pathname.startsWith("/admin")) {
    // 1. In production, check for the session cookie
    // const session = request.cookies.get("next-auth.session-token");
    // if (!session) return NextResponse.redirect(new URL("/login", request.url));

    // 2. Role-based granular checks
    if (pathname.startsWith("/admin/settings")) {
       // Only ADMIN allowed here
       // Check user role from session/token
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
