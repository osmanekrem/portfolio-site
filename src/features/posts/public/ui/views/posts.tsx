import {db} from "@/db/drizzle";
import {posts} from "@/db/schema";
import {desc} from "drizzle-orm";
import {generateBlogSchema, jsonLdScriptProps} from "@/lib/schema";
import React, {Suspense} from "react";
import PostLoader from "@/features/posts/public/ui/components/post.loader";
import PostList from "@/features/posts/public/ui/components/post-list";

export default async function PostsComponent() {
    const postListPromise = db
        .select()
        .from(posts)
        .orderBy(desc(posts.createdAt));

    const blogSchema = generateBlogSchema();

    return (
        <>
            <script {...jsonLdScriptProps(blogSchema)} />
            <div className="flex flex-col w-full items-start gap-y-4">
                <h1 className="text-2xl mt-4 font-bold">Posts</h1>
                <Suspense fallback={<PostLoader />}>
                    <PostList postListPromise={postListPromise} />
                </Suspense>
            </div>
        </>
    );
}