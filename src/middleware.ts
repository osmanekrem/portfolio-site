
import {NextRequest, NextResponse} from "next/server";
import {analytics} from "@/lib/analytics";
import {auth} from "@/auth";


export default async function middleware(req: NextRequest, res: NextResponse) {
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
    console.error(error)
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
            console.error(error)
        }
    }

    try {

        // NextAuth middleware'ini çalıştır
        const authResult = await auth()


    } catch (error) {
        console.error('Auth error:', error)
        // Auth hatası durumunda da normal devam et
        return NextResponse.next()
    }

    return NextResponse.next()
}

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}