import ProjectForm from "@/components/admin/forms/project-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export default function NewProjectPage() {
  return (
    <>
      <Link href="/admin/projects" className={cn(buttonVariants(), "mb-5")}>
        Go Back
      </Link>

      <section className="w-full overflow-y-auto overflow-x-visible hide-scrollbar">
        <ProjectForm type="create" />
      </section>
    </>
  );
}
