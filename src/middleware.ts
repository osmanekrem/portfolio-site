import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from "@/routes";
import { analytics } from "@/utils/analytics";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isAdminRoute = nextUrl.pathname.startsWith(DEFAULT_LOGIN_REDIRECT)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  

  if(nextUrl.pathname === "/") {
    try {
      analytics.track("pageview", {
        page: "/",
        country: req.geo?.country
      })
    } catch (err) {
      console.error(err)
    }
  }

  if(isApiAuthRoute) {
    return
  }

  if(isAuthRoute) {
    if(isLoggedIn) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return
  }

  if(!isLoggedIn && !isPublicRoute && isAdminRoute) {
    return Response.redirect(new URL("/login", nextUrl))
  }

  return
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
