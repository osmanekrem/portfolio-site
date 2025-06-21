import { Metadata } from "next";
import React, { Suspense } from "react";
import { db } from "@/db/drizzle";
import { projects } from "@/db/schema";
import { desc } from "drizzle-orm";
import ProjectList from "./components/project-list";
import ProjectLoader from "./components/project-loader";
import { generatePortfolioSchema, jsonLdScriptProps } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Portfolio",
};

export default function PortfolioPage() {
  const projectListPromise = db
    .select()
    .from(projects)
    .orderBy(desc(projects.createdAt));

  const portfolioSchema = generatePortfolioSchema();

  return (
    <>
      <script {...jsonLdScriptProps(portfolioSchema)} />
      <div className="flex flex-col w-full items-start gap-y-4">
        <h1 className="text-2xl mt-4 font-bold">Projects</h1>
        <Suspense fallback={<ProjectLoader />}>
          <ProjectList projectListPromise={projectListPromise} />
        </Suspense>
      </div>
    </>
  );
}
