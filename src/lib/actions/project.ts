"use server";

import { db } from "@/db/drizzle";
import { projects } from "@/db/schema";
import { ProjectFormValues } from "@/types";

export const createProject = async (params: ProjectFormValues) => {
  try {
    const newProject = await db
      .insert(projects)
      .values({
        ...params,
      })
      .returning();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newProject[0])),
    };
  } catch (error) {
    console.log("Error creating project", error);
    return {
      success: false,
      error: "Error creating project",
    };
  }
};
