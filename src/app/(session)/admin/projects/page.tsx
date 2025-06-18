import React, { Suspense } from "react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import ProjectsTable from "./components/projects-table";
import { db } from "@/db/drizzle";
import { projects } from "@/db/schema";
import { desc } from "drizzle-orm";

export default function Page() {
  const projectListPromise = db
    .select()
    .from(projects)
    .orderBy(desc(projects.createdAt));
  return (
    <section className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Projects</h2>
        <Link href="/admin/projects/new" className={buttonVariants()}>
          + Add New Project
        </Link>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <Suspense fallback={<div>Loading...</div>}>
          <ProjectsTable projectListPromise={projectListPromise} />
        </Suspense>
      </div>
    </section>
  );
}
