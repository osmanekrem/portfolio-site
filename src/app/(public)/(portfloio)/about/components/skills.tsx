import { Badge } from "@/components/ui/badge";
import React from "react";

export default function Skills() {
  const skillSet = [
    {
      name: "Web Development",
      skills: [
        "HTML/CSS | SCSS",
        "Tailwind CSS",
        "ReactJS | Next.js",
        "Angular",
        "Node.js",
        "Express.js",
        "Hono.js",
        "REST API",
        "GraphQL",
        "Redux | Zustand",
        "Drizzle ORM",
        "Prisma ORM",
        "Tanstack",
      ],
    },
    {
      name: "Software Engineering / Software Development",
      skills: [
        "Python",
        "Java",
        "JavaScript",
        "TypeScript",
        "Swift",
        "Git",
        "MongoDB",
        "SQL",
        "noSQL",
        "Drizzle ORM",
        "Prisma ORM",
      ],
    },
    {
      name: "Design and Multimedia",
      skills: ["Photoshop", "Premiere Pro", "Blender"],
    },
  ];

  return (
    <div className="flex flex-col gap-y-4 w-full">
      <h2 className="text-2xl font-semibold">Skills</h2>
      <ul className="flex flex-col gap-y-4 w-full">
        {skillSet.map((skillSet, index) => (
          <li key={index} className="flex flex-col gap-y-1.5">
            <div className="">{skillSet.name}</div>
            <ul className="flex flex-wrap gap-x-1.5 gap-y-2.5">
              {skillSet.skills.map((skill, i) => (
                <li key={i}>
                  <Badge variant="secondary" size="medium">
                    {skill}
                  </Badge>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
