"use server";

import { db } from "@/db/drizzle";
import { projects } from "@/db/schema";
import { ProjectFormValues } from "@/types";
import { eq } from "drizzle-orm";

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

export const updateProject = async (id: string, params: ProjectFormValues) => {
  try {
    const updatedProject = await db
      .update(projects)
      .set({ ...params })
      .where(eq(projects.id, id))
      .returning();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(updatedProject[0])),
    };
  } catch (error) {
    console.log("Error updating project", error);
    return {
      success: false,
      error: "Error updating project",
    };
  }
};

export const deleteProject = async (id: string) => {
  try {
    await db.delete(projects).where(eq(projects.id, id));

    return {
      success: true,
    };
  } catch (error) {
    console.log("Error deleting project", error);
    return {
      success: false,
      error: "Error deleting project",
    };
  }
};
