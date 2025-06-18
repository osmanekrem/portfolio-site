import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Loader2, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Project } from "@/db/schema";
import { deleteProject } from "@/lib/actions/project";
import { toast } from "@/hooks/use-toast";

export default function ProjectActions({ project }: { project: Project }) {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-12 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="!size-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(project.id)}
        >
          Copy Project ID
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={`/admin/projects/edit/${project.id}`}
            className="cursor-pointer"
          >
            Edit Project
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive hover:text-destructive hover:!bg-destructive/15"
          disabled={isDeleting}
          onClick={() => {
            setIsDeleting(true);
            deleteProject(project.id).then((res) => {
              if (res.success) {
                toast({
                  title: "Project deleted successfully",
                  variant: "default",
                });
              } else {
                toast({
                  title: res.error,
                  variant: "destructive",
                });
              }
              setIsDeleting(false);
            });
          }}
        >
          {isDeleting && <Loader2 className="!size-4 mr-2" />}
          <span className="text-destructive">Delete Project</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
