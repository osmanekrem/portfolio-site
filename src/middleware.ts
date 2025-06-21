import { auth } from "@/auth"
import {NextResponse} from "next/server";
import {analytics} from "@/lib/analytics";

import { geolocation } from '@vercel/functions'

export default auth((req) => {
    const url = req.nextUrl.pathname
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
    const isAuthenticated = !!req.auth

    if(isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin", req.url))
    } else if (protectedRoutes.some(route => (
        url.startsWith(route) || url === route
    ))) {
        const role = req.auth?.user.role
        if(!isAuthenticated || role !== "ADMIN") {
            return NextResponse.redirect(new URL("/login", req.url))
        }
    }

    const {country} = geolocation(req)

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
})

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}