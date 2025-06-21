import Link from "next/link";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import PostForm from "@/components/admin/forms/post-form";
import React from "react";

export default function NewPostPage() {
    return (
        <>
            <Link href="/admin/posts" className={cn(buttonVariants(), "mb-5")}>
                Go Back
            </Link>

            <section className="w-full overflow-y-auto overflow-x-visible hide-scrollbar">
                <PostForm type="create" postPromise={Promise.resolve([])} />
            </section>
        </>
    )
}