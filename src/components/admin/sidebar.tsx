"use client";

import { cn } from "@/lib/utils";
import {
  BriefcaseBusinessIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  NotebookPenIcon,
} from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

const sidebarLinks = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboardIcon,
  },
  {
    name: "Projects",
    href: "/admin/projects",
    icon: BriefcaseBusinessIcon,
  },
  {
    name: "Posts",
    href: "/admin/posts",
    icon: NotebookPenIcon,
  },
];

export default function Sidebar({ session }: { session: Session }) {
  const pathname = usePathname();

  return (
    <div className="sticky left-0 top-0 flex h-dvh flex-col justify-between px-5 border-r pb-5 pt-10">
      <div>
        <div className="flex flex-row items-center gap-2 border-b border-dashed pb-10 max-md:justify-center">
          <Image src="/imgs/logo.png" alt="Logo" width={40} height={40} />
          <h1 className="text-2xl font-semibold text-foreground max-md:hidden">
            Admin
          </h1>
        </div>

        <div className="mt-10 flex flex-col gap-5">
          {sidebarLinks.map((link, i) => {
            const isActive =
              (link.href !== "/admin" &&
                pathname.includes(link.href) &&
                link.href.length > 1) ||
              pathname === link.href;
            return (
              <Link
                className={cn(
                  "flex flex-row items-center w-full gap-2 rounded-lg px-5 py-3.5 max-md:justify-center",
                  isActive && "bg-primary/10 shadow-sm"
                )}
                key={i}
                href={link.href}
              >
                <link.icon className={"size-5 "} />
                <p className="text-base font-medium max-md:hidden">
                  {link.name}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="my-8 flex w-full flex-row gap-2  border-dashed border-t pb-2 pt-10 shadow-sm ">
        <button className="flex flex-row items-center w-full gap-2 rounded-lg px-5 py-3.5 max-md:justify-center hover:bg-primary/10">
          <LogOutIcon className="size-5" />
          <p className="text-base font-medium max-md:hidden">Logout</p>
        </button>
      </div>
    </div>
  );
}
