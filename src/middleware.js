import { auth } from "./auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    if (!req.auth) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (req.auth.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
