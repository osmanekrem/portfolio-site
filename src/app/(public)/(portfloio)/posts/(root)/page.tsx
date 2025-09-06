import { Metadata } from "next";
import React from "react";
import PostsComponent from "@/features/posts/public/ui/views/posts";

export const metadata: Metadata = {
  title: "Posts",
};

export default function PostsPage() {
  return <PostsComponent />
}
