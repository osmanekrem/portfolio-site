"use server";

import { db } from "@/lib/db";
import { ProjectSchema } from "@/schemas";
import * as z from "zod";

export const createProject = async (values: z.infer<typeof ProjectSchema>) => {

  const validatedFields = ProjectSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { title, description, githubUrl, image, liveUrl, tags } = validatedFields.data;

  try {
    
    const project = await db.project.create({
        data: {
            image,
            title,
            description,
            githubUrl,
            liveUrl,
            tags
        }
    })
    
  } catch (error) {
        return {error: "Something went wrong!"}
  }

  return { success: "Project created successfully" };
};

export const updateProject = async (id: string, values: z.infer<typeof ProjectSchema>) => {

  const validatedFields = ProjectSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { title, description, githubUrl, image, liveUrl, tags } = validatedFields.data;

  try {
    
    const project = await db.project.update({
      where: {id}, 
        data: {
            image,
            title,
            description,
            githubUrl,
            liveUrl,
            tags
        }
    })
    
  } catch (error) {
        return {error: "Something went wrong!"}
  }

  return { success: "Project updated successfully" };
};
