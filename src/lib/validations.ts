import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const projectSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters"),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters"),
  tags: z.string().nonempty("Tags are required"),
  liveUrl: z.string().trim(),
  image: z.string().nonempty("Image is required"),
});

export const postSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters"),
  tags: z.string().nonempty("Tags are required"),
  content: z.string().trim().min(10, "Content must be at least 10 characters"),
  image: z.string().nonempty("Image is required"),
  slug: z.string().optional()
})
