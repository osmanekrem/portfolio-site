import ProjectForm from "@/components/admin/forms/project-form";
import { buttonVariants } from "@/components/ui/button";
import { db } from "@/db/drizzle";
import { projects } from "@/db/schema";
import { cn } from "@/lib/utils";
import { eq } from "drizzle-orm";
import Link from "next/link";
import React, { Suspense, use } from "react";

export default function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const projectPromise = db
    .select()
    .from(projects)
    .where(eq(projects.id, id))
    .limit(1);

  return (
    <>
      <Link href="/admin/projects" className={cn(buttonVariants(), "mb-5")}>
        Go Back
      </Link>

      <section className="w-full overflow-y-auto overflow-x-visible hide-scrollbar">
        <Suspense fallback={<div>Loading...</div>}>
          <ProjectForm type="update" projectPromise={projectPromise} />
        </Suspense>
      </section>
    </>
  );
}
