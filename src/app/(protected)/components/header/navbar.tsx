"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import useMedia from "@/hooks/use-media";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { MoreVertical } from "lucide-react";


export default function Navbar() {

    const pathname = usePathname()

  const items = [
    {
      path: "/admin",
      label: "Dashboard",
    },
    {
      path: "/admin/projects",
      label: "Projects",
    },
    {
      path: "/admin/skills",
      label: "Skills",
    },
  ];

  const isMobile = useMedia(1024)

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger><MoreVertical /></SheetTrigger>
        <SheetContent side="left">
          <nav  className="flex flex-col space-y-2 mt-6" >
        {items.map((link, i) => (
        <Link key={i} className={cn(
            "rounded text-foreground/60 whitespace-nowrap flex items-center hover:text-foreground hover:bg-accent font-medium px-3 h-12 text-sm",
            pathname === link.path && "text-foreground  bg-accent/70 "
          )} href={link.path}>
          {link.label}
        </Link>
      ))}
      </nav>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <nav className="flex space-x-4 flex-1 overflow-x-auto">
      {items.map((link, i) => (
        <Link key={i} className={cn(
            "rounded rounded-b-none text-foreground/60 whitespace-nowrap hover:text-foreground hover:bg-accent font-medium px-3 py-1.5 text-sm",
            pathname === link.path && "text-foreground  border-b-2 border-primary"
          )} href={link.path}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
