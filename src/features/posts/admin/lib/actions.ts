"use server";

import {db} from "@/db/drizzle";
import {posts} from "@/db/schema";
import {eq} from "drizzle-orm";
import {PostFormValues} from "@/features/posts/admin/schemas";

export const createPost = async (params: PostFormValues) => {
    try {
        const newPost = await db
            .insert(posts)
            .values({
                ...params
            })
            .returning();

        return {
            success: true,
            data: JSON.parse(JSON.stringify(newPost[0])),
        };
    } catch (error) {
        console.log("Error creating post", error);
        return {
            success: false,
            error: "Error creating post",
        };
    }
}

export const updatePost = async (id: string, params: PostFormValues) => {
    try {
        const updatedPost = await db
            .update(posts)
            .set(params)
            .where(eq(posts.id, id))
            .returning();

        return {
            success: true,
            data: JSON.parse(JSON.stringify(updatedPost[0])),
        };
    } catch (error) {
        console.log("Error updating post", error);
        return {
            success: false,
            error: "Error updating post",
        };
    }
}

export const deletePost = async (id: string) => {
    try {
        await db.delete(posts).where(eq(posts.id, id));

        return {
            success: true,
        };
    } catch (error) {
        console.log("Error deleting post", error);
        return {
            success: false,
            error: "Error deleting post",
        };
    }
}

