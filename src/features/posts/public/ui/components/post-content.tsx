"use client";

import { Post } from "@/db/schema";
import React from "react";
import { notFound } from "next/navigation";
import PostImage from "@/features/posts/public/ui/components/post-image";
import MarkdownPreview from "@/components/markdown-preview";

export default function PostContent({ post }: { post: Post }) {
  if (!post) {
    return notFound();
  }

  return (
    <article className="flex-1 flex h-full flex-col space-y-4">
      <div className="flex flex-col mt-4 items-start gap-y-2">
        <h1 className="text-2xl mt-4 font-bold">{post.title}</h1>
        <div className="flex flex-col gap-1.5">
          <span className="text-sm text-muted-foreground">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
          <span className="text-sm text-muted-foreground ml-2 flex flex-wrap gap-1.5">
            {post.tags.split(",").map((tag, index) => (
              <span
                key={index}
                className="bg-primary/25 text-foreground px-4 py-1 rounded-full text-xs"
              >
                {tag.trim()}
              </span>
            ))}
          </span>
        </div>
      </div>
      <PostImage post={post} />
      <MarkdownPreview content={post.content} />
      {/* Here you can add more details about the post */}
    </article>
  );
}
