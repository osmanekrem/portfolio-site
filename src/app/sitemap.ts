import { MetadataRoute } from "next";
import {db} from "@/db/drizzle";
import {posts} from "@/db/schema";

const getAllPost = () => {
    return db.select({ slug: posts.slug, updatedAt: posts.updatedAt }).from(posts)
}


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const defaultUrls: MetadataRoute.Sitemap = [
        {
            url: "https://osmanekrem.vercel.app/",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1.0
        },
        {
            url: "https://osmanekrem.vercel.app/portfolio",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1.0
        },
        {
            url: "https://osmanekrem.vercel.app/about",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1.0
        },
        {
            url: "https://osmanekrem.vercel.app/posts",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9
        },
    ]

    const postsData = await getAllPost()
    const postsUrls: MetadataRoute.Sitemap = postsData.map(post => ({
        url: `https://osmanekrem.vercel.app/posts/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: "weekly",
        priority: 0.8
    }))

    return [...defaultUrls, ...postsUrls]
}