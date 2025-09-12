
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const isAuthenticated = Boolean(token);

  const privateRoutes = ["/profile", "/dashboard"];
  const publicRoutes = ["/sign-in", "/sign-up"];

  const pathname = req.nextUrl.pathname;

  if (!isAuthenticated && privateRoutes.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (isAuthenticated && publicRoutes.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/dashboard/:path*", "/sign-in", "/sign-up"],
};
