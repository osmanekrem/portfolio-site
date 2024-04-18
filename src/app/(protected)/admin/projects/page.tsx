import ProjectCard from "@/app/(portfolio)/portfolio/components/projectCard";
import { getAllProjects } from "@/data/project";
import Link from "next/link";
import React from "react";

export default async function AdminProjectsPage() {

  const projects = await getAllProjects()

  return (
    <div className="flex w-full flex-col space-y-8">
      <div className='flex flex-col gap-y-4 w-full'>
        {
          projects?.map((project, i) => (
            <Link key={i} href={`/admin/projects/${project.id}`}>
            <ProjectCard title={project.title} description={project.description} tags={project.tags} liveUrl={project.liveUrl} githubUrl={project.githubUrl} image={project.image} />
            </Link>
          ))
        }
      </div>
    </div>
  );
}
