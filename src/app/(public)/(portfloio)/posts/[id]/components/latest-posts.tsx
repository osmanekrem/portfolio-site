import { Post } from "@/db/schema";
import PostCard from "@/app/(public)/(portfloio)/posts/components/post-card";

export default function LatestPosts({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <h2 className="text-2xl font-bold my-4">Latest Posts</h2>
      {posts?.map((post, i) => <PostCard post={post} key={i} />)}
    </div>
  );
}
