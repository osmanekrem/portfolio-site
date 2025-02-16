import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  if (session) return redirect("/admin");

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="container py-6 flex flex-col items-center justify-center flex-1">
        <div className="flex flex-col items-center justify-center w-full max-w-xs rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
}
