import { db } from "@/lib/db";

export const getAllProjects = async () => {
  try {
    const projects = await db.project.findMany();

    return projects;
  } catch {
    return null;
  }
};

export const getProjectById = async (id:string) => {
  try {
    const project = await db.project.findUnique({
      where: {
        id,
      },
    });

    return project;
  } catch {
    return null;
  }
};

export const deleteProjectById = async (id:string) => {
  try {
    const project = await db.project.delete({
      where: {
        id,
      },
    });

    return project;
  } catch {
    return null;
  }
};
