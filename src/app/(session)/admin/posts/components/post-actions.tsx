"use client"

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Loader2, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {Post} from "@/db/schema";
import { toast } from "@/hooks/use-toast";
import {deletePost} from "@/lib/actions/post";

export default function PostActions({ post }: { post: Post }) {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-12 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="!size-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(post.id)}
        >
          Copy Post ID
        </DropdownMenuItem>
        <DropdownMenuItem
        onClick={() => navigator.clipboard.writeText(post.slug)}
        >
          Copy Post Slug

        </DropdownMenuItem>
        <DropdownMenuItem>
            <Link href={`/posts/${post.slug}`} className="cursor-pointer">
                View Post
            </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={`/admin/posts/edit/${post.id}`}
            className="cursor-pointer"
          >
            Edit Post
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive hover:text-destructive hover:!bg-destructive/15"
          disabled={isDeleting}
          onClick={() => {
            setIsDeleting(true);
            deletePost(post.id).then((res) => {
              if (res.success) {
                toast({
                  title: "Post deleted successfully",
                  variant: "default",
                });
              } else {
                toast({
                  title: res.error,
                  variant: "destructive",
                });
              }
              setIsDeleting(false);
            });
          }}
        >
          {isDeleting && <Loader2 className="!size-4 mr-2" />}
          <span className="text-destructive">Delete Post</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
