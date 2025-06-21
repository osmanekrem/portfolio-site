import { Metadata } from "next";
import React, { Suspense } from "react";
import { db } from "@/db/drizzle";
import { posts } from "@/db/schema";
import { desc } from "drizzle-orm";
import PostList from "../components/post-list";
import PostLoader from "../components/post.loader";

export const metadata: Metadata = {
    title: "Posts",
};

export default async function PostsPage() {
    const postListPromise = db
        .select()
        .from(posts)
        .orderBy(desc(posts.createdAt));

    return (
        <div className="flex flex-col w-full items-start gap-y-4">
            <h1 className="text-2xl mt-4 font-bold">Posts</h1>
            <Suspense fallback={<PostLoader />}>
                <PostList postListPromise={postListPromise} />
            </Suspense>
        </div>
    );
}
