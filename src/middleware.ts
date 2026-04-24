import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default auth(async (req) => {
  const { nextUrl, cookies } = req;
  const isLoggedIn = !!req.auth;

  // 1. Skip checks for static assets and API (handled by API routes themselves if needed)
  if (
    nextUrl.pathname.startsWith("/_next") ||
    nextUrl.pathname.startsWith("/api") ||
    nextUrl.pathname.startsWith("/static") ||
    nextUrl.pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // 2. Setup Gating - Force users to /setup if site is not configured
  if (nextUrl.pathname !== "/setup") {
    const isSetupDone = cookies.get("prajapalana_setup_complete")?.value === "true";

    if (!isSetupDone) {
      try {
        const protocol = nextUrl.protocol;
        const host = nextUrl.host;
        // In local/production protocol might vary, we construct the absolute URL for the fetch
        const statusRes = await fetch(`${protocol}//${host}/api/setup/status`, {
          next: { revalidate: 60 } // Cache the check result
        });
        
        if (statusRes.ok) {
          const status = await statusRes.json();
          if (!status.isComplete) {
            return NextResponse.redirect(new URL("/setup", nextUrl));
          } else {
            // Set session cookie to avoid redundant fetches in this browser session
            const response = NextResponse.next();
            response.cookies.set("prajapalana_setup_complete", "true", { 
              maxAge: 31536000, // 1 year
              path: "/" 
            });
            return response;
          }
        }
      } catch (e) {
        console.error("Setup Check Error:", e);
      }
    }
  }

  // 3. Admin Access Control
  if (nextUrl.pathname.startsWith("/admin")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }
    
    const role = (req.auth?.user as any)?.role;
    if (role !== "ADMIN" && role !== "EDITOR") {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
  }

  return NextResponse.next();
});

// Match all request paths except for the ones starting with:
// - api (API routes)
// - _next/static (static files)
// - _next/image (image optimization files)
// - favicon.ico (favicon file)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
