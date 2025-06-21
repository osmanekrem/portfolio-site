import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

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
