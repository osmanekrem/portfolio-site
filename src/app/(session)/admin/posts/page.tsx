import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import React, {Suspense} from "react";
import PostsTable from "@/features/posts/admin/ui/components/posts-table";
import {posts} from "@/db/schema";
import {db} from "@/db/drizzle";
import {desc} from "drizzle-orm";

export default function PostsPage() {
    const postsPromise = db.select().from(posts).orderBy(desc(posts.createdAt));


    return (
        <section className="w-full">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xl font-semibold">All Posts</h2>
                <Link href="/admin/posts/new" className={buttonVariants()}>
                    + Add New Post
                </Link>
            </div>

            <div className="mt-7 w-full overflow-hidden">
                <Suspense fallback={<div>Loading...</div>}>
                    <PostsTable postsPromise={postsPromise} />
                </Suspense>
            </div>
        </section>
    )
}