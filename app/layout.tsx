import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { cn } from "@/lib/utils";
import { BaseLayout } from "@/components/layout/base";

export const metadata: Metadata = {};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          "h-full w-full hyphens-auto font-body bg-white dark:bg-gray-950 text-black dark:text-white",
        )}
      >
        <BaseLayout>{children}</BaseLayout>
      </body>
    </html>
  );
}
