import { Metadata } from "next";
import React from "react";
import ProjectCard from "./components/projectCard";
import { db } from "@/db/drizzle";
import { projects } from "@/db/schema";
import { desc } from "drizzle-orm";

export const metadata: Metadata = {
  title: "Portfolio",
};

export default async function PortfolioPage() {
  const projectList =
    (await db.select().from(projects).orderBy(desc(projects.createdAt))) || [];

  return (
    <div className="flex flex-col w-full items-start gap-y-4">
      <h1 className="text-2xl mt-4 font-bold">Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        {projectList?.map((project, i) => (
          <ProjectCard
            key={i}
            title={project.title}
            description={project.description}
            tags={project.tags.split(",")}
            liveUrl={project.liveUrl}
            image={project.image}
          />
        ))}
      </div>
    </div>
  );
}
