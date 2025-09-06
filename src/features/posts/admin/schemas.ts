import {z} from "zod";

export const postSchema = z.object({
    title: z.string().trim().min(3, "Title must be at least 3 characters"),
    tags: z.string().nonempty("Tags are required"),
    content: z.string().trim().min(10, "Content must be at least 10 characters"),
    image: z.string().nonempty("Image is required"),
    slug: z.string()
})

export type PostFormValues = z.infer<typeof postSchema>;