import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/login", "/admin"]
            }
        ],
        sitemap: "https://osmanekrem.vercel.app/sitemap.xml"
    }
}