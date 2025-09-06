"use client";

import {cn} from "@/lib/utils";
import {
    BriefcaseBusinessIcon,
    LayoutDashboardIcon,
    LogOutIcon,
    NotebookPenIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import React from "react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarGroupContent,
    SidebarMenu
} from "@/components/ui/sidebar"
import {signOut} from "next-auth/react";
import {authClient} from "@/lib/auth-client";

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

export default function AdminSidebar() {
    const pathname = usePathname()
    const router =useRouter()

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex flex-row items-center gap-2 px-5 py-3.5 ">
                    <Image src="/imgs/logo.png" alt="Logo" width={40} height={40}/>
                    <h1 className="text-2xl font-semibold text-foreground">
                        Admin
                    </h1>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {sidebarLinks.map((link, i) => {
                                const isActive =
                                    (link.href !== "/admin" &&
                                        pathname.includes(link.href) &&
                                        link.href.length > 1) ||
                                    pathname === link.href;
                                return (
                                    <Link
                                        className={cn(
                                            "flex flex-row items-center w-full gap-2 rounded-lg px-5 py-3.5 hover:bg-primary/15",
                                            isActive && "bg-primary/10 shadow-sm"
                                        )}
                                        key={i}
                                        href={link.href}
                                    >
                                        <link.icon className={"size-5 "}/>
                                        <p className="text-base font-medium">
                                            {link.name}
                                        </p>
                                    </Link>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <button
                    onClick={async () => {
                        await authClient.signOut({
                            fetchOptions: {
                                onSuccess: () => {
                                    router.push("/login");
                                },
                            }
                        })
                    }}
                    className="flex shrink-0 items-center w-full gap-2 rounded-lg px-5 py-3.5  hover:bg-primary/10">
                    <LogOutIcon className="size-5"/>
                    <p className="text-base font-medium">Logout</p>
                </button>
            </SidebarFooter>
        </Sidebar>
    )
}
