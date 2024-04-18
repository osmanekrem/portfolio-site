import { Badge } from "@/components/ui/badge";
import { GithubIcon } from "@/components/ui/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  description: string | null;
  image: string;
  liveUrl: string | null;
  githubUrl: string | null;
  tags: string[];
};

export default function ProjectCard({
  title,
  description,
  image,
  liveUrl,
  githubUrl,
  tags,
}: Props) {
  return (
    <div className="grid w-full grid-cols-1 md:grid-cols-2 divide-y md:divide-x md:divide-y-0 rounded-md overflow-hidden border">
      {liveUrl ? (
        <Link
          className="relative w-full overflow-hidden h-full aspect-video"
          target="_blank"
          aria-label="go to live website"
          href={liveUrl}
        >
          <Image
            fill
            sizes="100%, 100%"
            className="object-cover aspect-video transition-transform hover:scale-105"
            alt={title}
            src={image}
          />
        </Link>
      ) : (
        <div className="relative w-full overflow-hidden h-full aspect-video">
          <Image
            fill
            sizes="100%, 100%"
            className="object-cover aspect-video transition-transform hover:scale-105"
            alt={title}
            src={image}
          />
        </div>
      )}
      <div className="flex flex-col p-4 gap-y-4 items-start">
        <h2 className="font-semibold text-xl">{title}</h2>
        {description && <p className="text">{description}</p>}
        <div className="flex flex-wrap w-full gap-1.5">
          {tags.map((tag, i) => (
            <Badge key={i}>{tag}</Badge>
          ))}
        </div>
        <div className="flex gap-x-2 mt-auto items-center">
          {liveUrl && (
            <Link
              target="_blank"
              aria-label="go to live website"
              href={liveUrl}
              className="text-primary hover:underline"
            >
              Live
            </Link>
          )}
          {githubUrl && (
            <Link target="_blank" aria-label="go to github page" href={githubUrl}>
              <GithubIcon size={16} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
