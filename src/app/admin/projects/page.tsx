import React from "react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <section className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Projects</h2>
        <Link href="/admin/projects/new" className={buttonVariants()}>
          + Add New Project
        </Link>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <p>Table</p>
      </div>
    </section>
  );
}
