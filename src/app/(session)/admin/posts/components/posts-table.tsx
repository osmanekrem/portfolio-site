"use client";

import {Post} from "@/db/schema";
import React, {use, useState} from "react";
import {ColumnDef, DataTable, TableOptions} from "tanstack-shadcn-table";
import {IKImage} from "imagekitio-next";
import config from "@/lib/config";
import PostActions from "@/app/(session)/admin/posts/components/post-actions";

const columns: ColumnDef<Post>[] = [
    {
        accessorKey: "id",
        header: 'Actions',
        cell: ({ row }) => {
            return <PostActions post={row.original} />
        },
        size: 80,
        maxSize: 80,
        minSize: 80,

    },
    {
        accessorKey: "title",
        header: "Title",
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
        accessorKey: "tags",
        header: "Tags",
    }
]

export default function PostsTable({
    postsPromise                                   }: {
    postsPromise: Promise<Post[]>;
}) {
    const posts = use(postsPromise);

    const [tableOptions, setTableOptions] = useState<TableOptions<Post>>({
        data: posts,
        columns,
        pagination: {
            pageSize: 10,
            totalRecords: posts.length,
        },
    });
    return <DataTable<Post> tableOptions={tableOptions} className="py-4" />;
}