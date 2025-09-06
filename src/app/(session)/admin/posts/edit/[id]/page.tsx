import PostForm from "@/features/posts/admin/ui/views/post-form";
import { buttonVariants } from "@/components/ui/button";
import { db } from "@/db/drizzle";
import { posts } from "@/db/schema";
import { cn } from "@/lib/utils";
import { eq } from "drizzle-orm";
import Link from "next/link";
import React, { Suspense, use } from "react";

export default function EditPostPage({
                                            params,
                                        }: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);

    const postPromise = db
        .select()
        .from(posts)
        .where(eq(posts.id, id))
        .limit(1);

    return (
        <>
            <Link href="/admin/posts" className={cn(buttonVariants(), "mb-5")}>
                Go Back
            </Link>

            <section className="w-full overflow-y-auto overflow-x-visible hide-scrollbar">
                <Suspense fallback={<div>Loading...</div>}>
                    <PostForm type="update" postPromise={postPromise} />
                </Suspense>
            </section>
        </>
    );
}
