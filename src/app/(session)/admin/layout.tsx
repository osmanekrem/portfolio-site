
import Header from "@/components/admin/header";
import Sidebar from "@/components/admin/sidebar";
import React, {ReactNode} from "react";
import {SidebarProvider} from "@/components/ui/sidebar";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {

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
