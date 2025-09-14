import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkSession } from "./lib/api/serverApi"; 

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const pathname = req.nextUrl.pathname;

  const privateRoutes = ["/profile", "/notes"]; 
  const publicRoutes = ["/sign-in", "/sign-up"];

  const isAuthenticated = Boolean(accessToken);

 
  if (!isAuthenticated && privateRoutes.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  
  if (isAuthenticated && publicRoutes.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL("/", req.url)); 
  }


  if (!accessToken && refreshToken) {
    try {
      const newSession = await checkSession(refreshToken);

      if (newSession?.accessToken && newSession?.refreshToken) {
        const response = NextResponse.next();
        response.cookies.set("accessToken", newSession.accessToken, {
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });
        response.cookies.set("refreshToken", newSession.refreshToken, {
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });

        return response;
      }
    } catch (error) {
      console.error("Session refresh failed:", error);
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
