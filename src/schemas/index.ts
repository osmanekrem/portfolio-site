import { z } from "zod"

export const LoginSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(8)
})

export const ProjectSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(2),
  liveUrl: z.string().min(2),
  githubUrl: z.string(),
  image: z.string().min(2),
  tags: z.array(z.string())
})
