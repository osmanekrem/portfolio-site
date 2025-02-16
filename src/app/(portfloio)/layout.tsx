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
      <main className="container flex flex-col flex-1">
        <Header />
        <div className="flex-1 flex shrink-0 w-full">{children}</div>
      </main>
      <Footer />
    </>
  );
}
