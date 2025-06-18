import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Osman Ekrem",
    default: "Osman Ekrem",
  },
  keywords: [
    "Osman Ekrem",
    "portfolio",
    "web developer",
    "software engineer",
    "Osman",
    "Ekrem",
  ],
  description: "Osman Ekrem's portfolio site",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    title: "Osman Ekrem",
    description: "Osman Ekrem's portfolio site",
    url: "https://osmanekrem.vercel.app",
    siteName: "Osman Ekrem",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <SpeedInsights />
        <body
          className={cn(
            inter.className,
            "antialiased h-dvh w-full flex flex-col overflow-x-hidden overflow-y-auto custom-scrollbar"
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
    </html>
  );
}
