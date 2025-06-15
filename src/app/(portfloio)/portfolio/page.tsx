import { Metadata } from "next";
import React, { Suspense } from "react";
import ProjectCard from "./components/projectCard";
import { db } from "@/db/drizzle";
import { projects } from "@/db/schema";
import { desc } from "drizzle-orm";
import ProjectList from "./components/project-list";
import ProjectLoader from "./components/project-loader";

export const metadata: Metadata = {
  title: "Portfolio",
};

export default async function PortfolioPage() {
  const projectListPromise = db
    .select()
    .from(projects)
    .orderBy(desc(projects.createdAt));

  return (
    <div className="flex flex-col w-full items-start gap-y-4">
      <h1 className="text-2xl mt-4 font-bold">Projects</h1>
      <Suspense fallback={<ProjectLoader />}>
        <ProjectList projectListPromise={projectListPromise} />
      </Suspense>
    </div>
  );
}
