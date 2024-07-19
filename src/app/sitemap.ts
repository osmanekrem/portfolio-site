import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return [
        {
            url: "https://osmanekrem.vercel.app/",
            lastModified: new Date()
        },
        {
            url: "https://osmanekrem.vercel.app/portfolio",
            lastModified: new Date()
        },
        {
            url: "https://osmanekrem.vercel.app/about",
            lastModified: new Date()
        },
    ]
}