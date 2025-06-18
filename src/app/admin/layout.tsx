import {auth} from "@/auth";
import Header from "@/components/admin/header";
import Sidebar from "@/components/admin/sidebar";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React, {ReactNode} from "react";
import {SidebarProvider} from "@/components/ui/sidebar";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) return redirect("/login");

  const isAdmin = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1)
    .then((res) => res?.[0]?.role === "ADMIN");

  if (!isAdmin) return redirect("/login");



  return (
    <main className="flex min-h-screen w-full flex-row">
        <SidebarProvider defaultOpen={true}>
      <Sidebar />

      <div className="container flex flex-col flex-1 p-5 sm:p-10">
        <Header />
        {children}
      </div>
            </SidebarProvider>
    </main>
  );
}
