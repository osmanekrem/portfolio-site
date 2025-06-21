import { auth } from "@/auth"
import {NextResponse} from "next/server";
import {analytics} from "@/lib/analytics";

export default auth((req) => {
    const fullMatchRoutes = [
        "/",
        "/about",
        "/portfolio",
        "/posts",
    ]

    const startsWithMatchRoutes = [
        "/posts/",
    ]

    const url = req.nextUrl.pathname

    const analyticsEnabled = (
        fullMatchRoutes.includes(url) ||
        startsWithMatchRoutes.some(route => url.startsWith(route))
    )


    if(fullMatchRoutes.includes(url)) {

    try {
    analytics.track("pageview", {
      page: url,
      country: req.geo?.country
    })
    } catch (error) {

    }
    }  else if (startsWithMatchRoutes.some(route => url.startsWith(route))) {
        try {
            analytics.track("pageview", {
                page: url,
                country: req.geo?.country
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