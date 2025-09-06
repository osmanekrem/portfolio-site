import {NextRequest, NextResponse} from "next/server";
import {analytics} from "@/lib/analytics";

import { geolocation } from '@vercel/functions'
import {getSessionCookie} from "better-auth/cookies";

export async function middleware(request: NextRequest)  {
    const url = request.nextUrl.pathname
    const sessionCookie = getSessionCookie(request);
    const fullMatchRoutes = [
        "/",
        "/about",
        "/portfolio",
        "/posts",
    ]

    const startsWithMatchRoutes = [
        "/posts/",
    ]

    const authRoutes = [
        "/login",
    ]

    const protectedRoutes = [
        "/admin"
    ]

    const isAuthRoute = authRoutes.includes(url)

    if(isAuthRoute && sessionCookie) {
    return NextResponse.redirect(new URL("/admin", request.url))
    } else if (protectedRoutes.some(route => (
        url.startsWith(route) || url === route
    ))) {
        if(!sessionCookie) {
            return NextResponse.redirect(new URL("/login", request.url))
        }
    }

    const {country} = geolocation(request)

    if(fullMatchRoutes.includes(url)) {

    try {
    analytics.track("pageview", {
      page: url,
      country: country
    })
    } catch (error) {

    }
    }  else if (startsWithMatchRoutes.some(route => url.startsWith(route))) {
        try {
            analytics.track("pageview", {
                page: url,
                country: country
            }, {
                persist: true
            })
        } catch (error) {

        }
    }

    return NextResponse.next()
}

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}