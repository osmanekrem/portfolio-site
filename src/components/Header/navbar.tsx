"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MoreVertical } from "lucide-react";
import useMedia from "@/hooks/use-media";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const items = [
    {
      path: "/",
      label: "Home",
    },
    {
      path: "/about",
      label: "About Me",
    },
    {
      path: "/portfolio",
      label: "Portfolio",
    },
    {
      path: "/posts",
      label: "Posts",
    }
  ];

  const isMobile = useMedia(1024);

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={(v) => setOpen(v)}>
        <SheetTrigger name="drawer button" aria-label="open drawer">
          <MoreVertical />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-2 mt-6">
            {items.map((link, i) => {
              const isActive =
                (pathname !== "/" &&
                  pathname.includes(link.path) &&
                  link.path.length > 1) ||
                pathname === link.path;
              return (
                <Link
                  key={i}
                  className={cn(
                    "rounded text-foreground/60 whitespace-nowrap flex items-center hover:text-foreground hover:bg-accent font-medium px-3 h-12 text-sm",
                    isActive && "text-foreground  bg-accent/70 "
                  )}
                  href={link.path}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <nav className="flex space-x-4 flex-1 overflow-x-auto">
      {items.map((link, i) => {
        const isActive =
          (pathname !== "/" &&
            pathname.includes(link.path) &&
            link.path.length > 1) ||
          pathname === link.path;
        return (
          <Link
            key={i}
            className={cn(
              "rounded rounded-b-none text-foreground/60 whitespace-nowrap hover:text-foreground hover:bg-accent font-medium px-3 py-1.5 text-sm",
              isActive && "text-foreground  border-b-2 border-primary"
            )}
            href={link.path}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
