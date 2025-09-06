import React, { use } from "react";
import PostCard from "./post-card";
import { Post } from "@/db/schema";

export default function PostList({
  postListPromise,
}: {
  postListPromise: Promise<Post[]>;
}) {
  const postList = use(postListPromise);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
      {postList?.map((post, i) => (
        <PostCard
          key={i}
            post={post}
        />
      ))}
    </div>
  );
}
