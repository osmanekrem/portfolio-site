"use client";

import { Badge } from "@/components/ui/badge";
import config from "@/lib/config";
import { IKImage } from "imagekitio-next";
import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  description: string | null;
  image: string;
  liveUrl: string | null;
  tags: string[];
};

export default function ProjectCard({
  title,
  description,
  image,
  liveUrl,
  tags,
}: Props) {
  return (
    <div className="grid w-full grid-cols-1  divide-y  overflow-hidden ">
      {liveUrl ? (
        <Link
          className="relative w-full overflow-hidden h-full aspect-video"
          target="_blank"
          aria-label="go to live website"
          href={liveUrl}
        >
          <IKImage
            fill
            className="object-cover aspect-video transition-transform hover:scale-105"
            alt={title}
            path={image}
            urlEndpoint={config.env.imagekit.urlEndpoint}
            loading="lazy"
            lqip={{ active: true }}
          />
        </Link>
      ) : (
        <div className="relative w-full overflow-hidden h-full aspect-video">
          <IKImage
            fill
            className="object-cover aspect-video transition-transform hover:scale-105"
            alt={title}
            path={image}
            urlEndpoint={config.env.imagekit.urlEndpoint}
            loading="lazy"
            lqip={{ active: true }}
          />
        </div>
      )}
      <div className="flex flex-col p-4 gap-y-4 items-center">
        <h2 className="font-semibold text-xl">{title}</h2>
        <p className="text-sm text-center">{description}</p>
        <div className="flex gap-2">
          {tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
