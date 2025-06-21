"use client";

import { Project } from "@/db/schema";
import config from "@/lib/config";
import { format } from "date-fns";
import { IKImage } from "imagekitio-next";
import Link from "next/link";
import { use, useState } from "react";
import { ColumnDef, DataTable, TableOptions } from "tanstack-shadcn-table";
import ProjectActions from "./project-actions";

const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "id",
    header: "Actions",
    cell: ({ row }) => {
      return <ProjectActions project={row.original} />;
    },
    size: 80,
    maxSize: 80,
    minSize: 80,
  },
  {
    header: "Title",
    accessorKey: "title",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return (
        <span className="!line-clamp-2 text-sm !whitespace-normal">
          {row.original.description}
        </span>
      );
    },
  },
  {
    accessorKey: "tags",
    header: "Tags",
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      return (
        <IKImage
          className="object-cover aspect-video rounded-md"
          width={160}
          height={90}
          alt={row.original.title}
          path={row.original.image}
          urlEndpoint={config.env.imagekit.urlEndpoint}
          loading="lazy"
          lqip={{
            active: true,
            blur: 10,
          }}
        />
      );
    },
  },
  {
    accessorKey: "liveUrl",
    header: "Live URL",
    cell: ({ row }) => {
      return (
        <Link href={row.original.liveUrl} target="_blank">
          {row.original.liveUrl}
        </Link>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return <span>{format(row.original.createdAt, "dd/MM/yyyy HH:mm")}</span>;
    },
  },
];

export default function ProjectsTable({
  projectListPromise,
}: {
  projectListPromise: Promise<Project[]>;
}) {
  const projectList = use(projectListPromise);

  const [tableOptions, setTableOptions] = useState<TableOptions<Project>>({
    data: projectList,
    columns,
    pagination: {
      pageSize: 10,
      totalRecords: projectList.length,
    },
  });
  return <DataTable<Project> tableOptions={tableOptions} className="py-4" />;
}
