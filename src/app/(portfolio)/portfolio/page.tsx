import { Metadata } from 'next';
import React from 'react'
import ProjectCard from './components/projectCard';
import { getAllProjects } from '@/data/project';

export const metadata: Metadata = {
    title: "Portfolio",
};

export default async function PortfolioPage() {

  const projects = await getAllProjects()

  return (
    <div className='flex flex-col w-full items-start gap-y-4'>
      <h1 className='text-2xl mt-4 font-bold'>Projects</h1>
      <div className='flex flex-col gap-y-4 w-full'>
        {
          projects?.map((project, i) => (
            <ProjectCard key={i} title={project.title} description={project.description} tags={project.tags} liveUrl={project.liveUrl} githubUrl={project.githubUrl} image={project.image} />
          ))
        }
      </div>
    </div>
  )
}
