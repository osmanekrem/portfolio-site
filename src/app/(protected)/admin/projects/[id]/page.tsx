import { FC } from "react";
import ProjectForm from "../components/project-form";
import { getProjectById } from "@/data/project";
import { redirect } from "next/navigation";
import DeleteProject from "../components/delete-project";

interface ProjectsUpdatePageProps {
  params: { id: string };
}

const ProjectsUpdatePage: FC<ProjectsUpdatePageProps> = async ({ params }) => {
  const project = await getProjectById(params.id);

  if(!project) redirect("/admin/projects")


  return (
    <div className="space-y-4">
      <ProjectForm
        projectId={project?.id}
        type="update"
        description={project?.description ?? ""}
        tags={project?.tags ?? []}
        githubUrl={project?.githubUrl ?? ""}
        image={project?.image}
        liveUrl={project?.liveUrl ?? ""}
        title={project?.title}
      />
      <DeleteProject id={project.id} />
    </div>
  );
};
export default ProjectsUpdatePage;
