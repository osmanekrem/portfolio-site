"use client";
import {Post} from "@/db/schema";
import config from "@/lib/config";
import {IKImage} from "imagekitio-next";
import React, {useState} from "react";
import {cn} from "@/lib/utils";

export default function PostImage({post}: { post: Post }) {
    const [isLoading, setIsLoading] = useState(true);
    console.log(isLoading);
    return (
        <div className={cn("aspect-video rounded-md bg-primary/10 !border-none !outline-0 opacity-100", (isLoading ? 'animate-pulse' : ''))}>
            <div className={isLoading ? "opacity-0" : "opacity-100"}>

        <IKImage
            width={1280}
            height={720}
            alt={post.title}
            path={post.image}
            urlEndpoint={config.env.imagekit.urlEndpoint}
            loading="lazy"
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(true)}
            lqip={{
                active: true,
                blur: 10,
            }}
            className={"object-cover aspect-video rounded-md  !border-none !outline-0 transition-all"}
        />
            </div>
            </div>
    );
}