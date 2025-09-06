import {createPost} from "@/features/posts/admin/lib/actions";
import slugify from "slugify";
import {postSchema} from "@/features/posts/admin/schemas";

export async function POST(req: Request) {
  const expectedApiKey = process.env.API_SECRET
  const apiKey = req.headers.get("authorization")?.split(' ')[1];

  if(!apiKey || apiKey !== expectedApiKey) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
  }

  try {
    const values = await req.json();

    values.slug = slugify(values.title, { lower: true, strict: true });
    const post = postSchema.safeParse(values);
    if(!post.success) {
        return new Response(JSON.stringify({ message: "Invalid data", errors: post.error.errors }), { status: 400 });
    }

  const newPost = await createPost(post.data);
    if (!newPost.success) {
        return new Response(JSON.stringify({ message: newPost.error }), { status: 400 });
    }
    return new Response(JSON.stringify(newPost.data), { status: 201 });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: "Internal Server Error: " + error?.message }), { status: 500 });
  }
}