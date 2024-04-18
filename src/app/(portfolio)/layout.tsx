import Header from "@/components/Header";
import Footer from "@/components/footer";
import React from "react";

export default function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="max-w-7xl px-4 md:px-20 mx-auto w-full flex flex-col flex-1">
        <Header />
        <div className="flex-1 flex shrink-0 w-full">{children}</div>
      </main>
      <Footer />
    </>
  );
}
