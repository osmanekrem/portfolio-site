"use client";

import {Post} from "@/db/schema";
import {useRouter} from "next/navigation";
import React, {use, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "@/hooks/use-toast";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import FileUpload from "@/components/file-upload";
import {Button} from "@/components/ui/button";
import slugify from "slugify";
import {
    MultiSelector,
    MultiSelectorContent,
    MultiSelectorInput,
    MultiSelectorItem,
    MultiSelectorList,
    MultiSelectorTrigger
} from "@/components/ui/multi-select";
import MarkdownPreview from "@/components/markdown-preview";
import {PostFormValues, postSchema} from "@/features/posts/admin/schemas";
import {createPost, updatePost} from "@/features/posts/admin/lib/actions";

type PostFormProps = {
    type?: "create" | "update";
    postPromise: Promise<Post[]>;
}

export default function PostForm({
                                     type = "create",
                                     postPromise
                                 }: PostFormProps) {
    const router = useRouter();

    const post = use(postPromise ?? Promise.resolve([]))?.[0];

    const form = useForm<PostFormValues>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: post?.title || "",
            content: post?.content || "",
            tags: post?.tags || "",
            image: post?.image || "",
        },
    });

    const [showMarkdown, setShowMarkdown] = useState(false);

    const onSubmit = async (values: PostFormValues) => {
        values.slug = slugify(values.title);
        const result =
            type === "create"
                ? await createPost(values)
                : await updatePost(post?.id, values);

        if (result.success) {
            toast({
                title: "Success",
                description: type === "create" ? "Post created successfully" : "Post updated successfully",
            });
            router.push("/admin/posts");
        } else {
            toast({
                title: "Error",
                description: result.error,
                variant: "destructive",
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8 w-full">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <div className="space-y-8 w-full">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Post title" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="tags"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Tags</FormLabel>
                                    <FormControl>
                                        <MultiSelector
                                            values={field.value.length > 0 ? field.value?.split(",").map((tag: string) => tag.trim()) : []}
                                            onValuesChange={(e) => {
                                                field.onChange(e.length > 0 ? e.join(',') : '');
                                            }}
                                            defaultValue={field.value.length > 0 ? field.value?.split(",").map((tag: string) => tag.trim()) : []}
                                        >
                                            <MultiSelectorTrigger>
                                                <MultiSelectorInput placeholder="Select a tag"/>
                                            </MultiSelectorTrigger>
                                            <MultiSelectorContent>
                                                <MultiSelectorList>
                                                    {[
                                                        "react",
                                                        "javascript",
                                                        "nextjs",
                                                        "vue",
                                                        "angular",
                                                        "typescript",
                                                        "web development",
                                                        "programming",
                                                        "frontend",
                                                        "backend",
                                                        "fullstack",
                                                        "css",
                                                        "html",
                                                        "nodejs",
                                                        "express",
                                                        "mongodb",
                                                        "graphql",
                                                    ].map((tag) => (
                                                        <MultiSelectorItem key={tag} value={tag}>
                                                            {tag}
                                                        </MultiSelectorItem>
                                                    ))}
                                                </MultiSelectorList>
                                            </MultiSelectorContent>
                                        </MultiSelector>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="image"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Image</FormLabel>
                                    <FormControl>
                                        <FileUpload
                                            type="image"
                                            accept="image/*"
                                            folder="posts/images"
                                            placeholder="Upload post image"
                                            onFileChange={field.onChange}
                                            value={field.value}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex flex-col gap-2.5">
                        <div className="grid grid-cols-1 gap-2.5">
                            <Button
                                variant="outline"
                                size="sm"
                                type="button"
                                className="w-full"
                                onClick={() => setShowMarkdown(!showMarkdown)}
                            >
                                {showMarkdown ? "Edit" : "Preview"}
                            </Button>
                        </div>
                        {showMarkdown ? (
                            <MarkdownPreview  content={form.getValues().content} />
                            ) : (
                        <FormField
                            control={form.control}
                            name="content"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Content</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Post content" {...field} rows={40}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />)
                        }
                    </div>
                </div>
                <Button type="submit" size="lg" className="w-full">
                    {type === "create" ? "Add Post" : "Update Post"}
                </Button>
            </form>
        </Form>
    );
}