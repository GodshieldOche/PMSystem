// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { cookies } = request;
  const jwt = cookies.get("PmToken");
  if (
    request.nextUrl.pathname.includes("/login") ||
    request.nextUrl.pathname.includes("/register")
  ) {
    if (jwt) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!jwt) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/auth/login", "/auth/register"],
};
