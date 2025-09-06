"use client";

import {Post} from "@/db/schema";
import React, {use, useState} from "react";
import {ColumnDef, DataTable, TableOptions} from "tanstack-shadcn-table";
import {IKImage} from "imagekitio-next";
import config from "@/lib/config";
import PostActions from "@/features/posts/admin/ui/components/post-actions";
import PostImage from "@/features/posts/public/ui/components/post-image";

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
                <div className="w-32 h-18 relative">

                <PostImage  post={row.original} />
                </div>
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