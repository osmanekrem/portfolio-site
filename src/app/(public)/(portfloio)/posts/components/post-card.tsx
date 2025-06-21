"use client";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import React from "react";
import PostImage from "@/app/(public)/(portfloio)/posts/[id]/components/post-image";
import {Post} from "@/db/schema";

type Props = {
    post: Post
};

export default function PostCard({post}: Props) {
  return (
    <div className="flex flex-col w-full divide-y  overflow-hidden ">

        <Link
          className="relative w-full overflow-hidden aspect-video"
          aria-label="go to post page"
          href={post.slug ? `/posts/${post.slug}` : "#"}
        >
          <PostImage post={post}/>
        </Link>
      <div className="flex flex-col flex-1 p-4 gap-y-2.5 items-center">
        <h2 className="font-semibold text-xl text-center">{post.title}</h2>
        <p className="text-sm text-muted-foreground">
          {post.updatedAt.toLocaleDateString()}
        </p>
        <div className="flex gap-2 flex-wrap justify-center">
          {post.tags.split(',').map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
