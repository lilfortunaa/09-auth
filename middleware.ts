import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkSession } from "./lib/api/serverApi";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const pathname = req.nextUrl.pathname;

  const privateRoutes = ["/profile", "/notes"];

  let isAuthenticated = Boolean(accessToken);
  const response = NextResponse.next();

  
  if (!isAuthenticated && refreshToken) {
    try {
      const newSession = await checkSession();
      const { accessToken: newAccess, refreshToken: newRefresh } = newSession.data;

      if (newAccess && newRefresh) {
        response.cookies.set("accessToken", newAccess, {
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });
        response.cookies.set("refreshToken", newRefresh, {
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });
        isAuthenticated = true;
      }
    } catch (error) {
      console.error("Session refresh failed:", error);
    }
  }

  
  if (!isAuthenticated && privateRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return response;
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
