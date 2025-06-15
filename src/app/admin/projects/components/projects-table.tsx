"use client";

import { Project } from "@/db/schema";
import config from "@/lib/config";
import { IKImage } from "imagekitio-next";
import React, { use, useState } from "react";
import { ColumnDef, DataTable, TableOptions } from "tanstack-shadcn-table";

const columns: ColumnDef<Project>[] = [
  {
    header: "Title",
    accessorKey: "title",
  },
  {
    accessorKey: "description",
    header: "Description",
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
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
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
  return <DataTable<Project> tableOptions={tableOptions} />;
}
