"use client";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { Textarea } from "@/components/ui/textarea";
import { ProjectSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangleIcon, XIcon } from "lucide-react";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createProject, updateProject } from "@/actions/project";
import { toast } from "sonner";
import FileUpload from "@/components/file-upload";

type Props = {
  title?: string;
  description?: string;
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  tags?: string[];
  type?: "update" | "create";
  projectId?: string
};

export default function ProjectForm({
  title = "",
  description = "",
  image = "",
  liveUrl = "",
  githubUrl = "",
  tags: initialTags = [],
  type = "create",
  projectId
}: Props) {
  const { status } = useSession();

  const [error, setError] = useState<string | undefined>("");
  const [tags, setTags] = useState<string[]>([...initialTags, ""] ?? []);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ProjectSchema>>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      title,
      description,
      image,
      liveUrl,
      githubUrl,
      tags,
    },
  });

  function onSubmit(values: z.infer<typeof ProjectSchema>) {
    setError("");

    if (status === "authenticated") {
      startTransition(() => {
        if (type === "create") {
          createProject({ ...values, tags: tags.slice(0, -1) }).then((data) => {
            setError(data.error);
            if (data.success) {
              toast.success("Project Created!");
              form.reset();
            }
          });
        } else if (type === "update" && projectId) {
          updateProject(projectId, { ...values, tags: tags.slice(0, -1) }).then((data) => {
            setError(data.error);
            if (data.success) {
              toast.success("Project Updated!");
              form.reset();
            }
          });
        }
      });
    } else {
      setError("Unauthenticated!");
    }
  }

  const tagChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.includes(",")) {
      setTags((prev) => [...prev, ""]);
    } else {
      setTags((prev) => [...prev.slice(0, -1), e.target.value]);
    }
  };

  const keyDownHandle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !e.currentTarget.value) {
      e.preventDefault();
      setTags((tags) => tags.slice(0, -1));
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-4 w-full grid grid-cols-1 lg:grid-cols-2"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="project 1"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-full gap-4 grid grid-cols-1 lg:grid-cols-2 ">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isPending}
                  placeholder="Description"
                  className="flex-1"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Image</FormLabel>
              <FormControl className="">
                <div className="border aspect-video flex items-center justify-center rounded overflow-hidden">
                  <FileUpload
                    imageClass="aspect-video"
                    endpoint="projectImage"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <FormField
          control={form.control}
          name="liveUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Live Url</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="www.example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="githubUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Github Url</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="github.com/username/repo"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col w-full space-y-2 col-span-full items-start">
          <Label>Tags</Label>
          <div className="flex flex-wrap border p-2 rounded w-full gap-1.5">
            {tags.slice(0, -1).map((tag, i) => (
              <Badge variant="default" key={i}>
                {tag}
                <button
                  type="button"
                  onClick={(e) =>
                    setTags((tags) =>
                      tags.slice(0, i).concat(tags.slice(i + 1, tags.length))
                    )
                  }
                >
                  <XIcon size={16} />
                </button>
              </Badge>
            ))}
            <input
              disabled={isPending}
              value={tags.at(-1)}
              onChange={tagChangeHandle}
              onKeyDown={keyDownHandle}
              placeholder='press "," to ad tag'
              className="w-full border-none !outline-none bg-transparent !ring-transparent"
            />
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertTriangleIcon size={16} />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}

        <Button disabled={isPending} className="col-span-full" type="submit">
          {type === "create" ? "Create" : "Update"}
        </Button>
      </form>
    </Form>
  );
}
