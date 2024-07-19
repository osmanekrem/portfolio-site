import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Poppins({ weight: ["400","500","600","700"], subsets: ["latin-ext"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Osman Ekrem",
    default: "Osman Ekrem",
  },
  description: "Osman Ekrem's portfolio site",
  twitter: {
    card: "summary_large_image"
  },
  openGraph: {
    title: "Osman Ekrem",
    description: "Osman Ekrem's portfolio site",
    url: "https://osmanekrem.vercel.app",
    siteName: "Osman Ekrem",
    type: "website"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={cn(inter.className, "antialised h-screen w-full flex flex-col overflow-x-hidden overflow-y-auto")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <Toaster richColors   />
      </body>
    </html>
  );
}
