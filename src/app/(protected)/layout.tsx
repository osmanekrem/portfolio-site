import { SessionProvider } from "next-auth/react";
import Header from "./components/header";
import React from "react";

export default function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>

      <main className="max-w-7xl px-4 md:px-20 mx-auto w-full flex flex-col flex-1">
        <Header />
        <div className="flex-1 flex shrink-0 w-full">{children}</div>
      </main>
    </SessionProvider>
  );
}
