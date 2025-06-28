import React, { Suspense } from "react";
import { db } from "@/db/drizzle";
import { posts } from "@/db/schema";
import { asc, eq, not } from "drizzle-orm";
import { notFound } from "next/navigation";
import PostContent from "@/app/(public)/(portfloio)/posts/[id]/components/post-content";
import LatestPosts from "@/app/(public)/(portfloio)/posts/[id]/components/latest-posts";
import { generateBlogPostSchema, jsonLdScriptProps } from "@/lib/schema";

export const revalidate = 86400;
export async function generateStaticParams() {
  const allPosts = await db.select().from(posts);

  return allPosts.map((post) => ({
    id: post.slug,
  }));
}
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
  const post = await db
    .select()
    .from(posts)
    .where(eq(posts.slug, id))
    .limit(1)
    .then((posts) => posts[0]);

  if (!post) return notFound();

  return {
    title: post.title,
    description: post.content.substring(0, 160),
    keywords: post.tags.split(","),
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 160),
      images: [
        {
          url: post.image || "/default-image.jpg",
          alt: post.title,
        },
      ],
      type: "article",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${post.slug}`,
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      tags: post.tags,
      authors: [`${process.env.NEXT_PUBLIC_BASE_URL}/about`],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.content.substring(0, 160),
      images: [
        {
          url: post.image || "/default-image.jpg",
          width: 1024,
          height: 576,
          alt: post.title,
        },
      ],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${post.slug}`,
    },
  };
}

export default async function PostDetailPage({
  params,
}: {

  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await db
    .select()
    .from(posts)
    .where(eq(posts.slug, id))
    .limit(1)
    .then((posts) => posts[0]);

  if (!post) {
    notFound();
  }

  const relatedPosts = await db
    .select()
    .from(posts)
    .where(not(eq(posts.slug, id)))
    .orderBy(asc(posts.createdAt))
    .limit(3);

  const blogPostSchema = generateBlogPostSchema(post);

  return (
    <>
      <script {...jsonLdScriptProps(blogPostSchema)} />
      <div className="flex max-lg:flex-col w-full gap-6">
        <div className="flex flex-col flex-1 overflow-y-auto">
          <Suspense fallback={<div>Loading...</div>}>
            <PostContent post={post} />
          </Suspense>
        </div>
        <div className="w-full lg:sticky lg:top-0 lg:right-0 lg:h-full max-h-screen lg:max-w-2xs p-4 ">
          <LatestPosts posts={relatedPosts} />
        </div>
      </div>
    </>
  );
}
