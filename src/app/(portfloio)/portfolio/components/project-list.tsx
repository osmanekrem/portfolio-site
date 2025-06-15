import React, { use } from "react";
import ProjectCard from "./projectCard";
import { Project } from "@/db/schema";

export default function ProjectList({
  projectListPromise,
}: {
  projectListPromise: Promise<Project[]>;
}) {
  const projectList = use(projectListPromise);

  return (
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
  );
}
