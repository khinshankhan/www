import type { Metadata } from "next";
import "./globals.css";
import { Divider } from "@/components/primitives/divider";

export const metadata: Metadata = {};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col bg-white dark:bg-zinc-950 text-zinc-950 dark:text-white min-h-screen">
        <div className="flex flex-col min-h-[87vh]">
          <div className="min-h-[100px]">Header goes here</div>
          <div className="grow flex flex-col">{children}</div>
        </div>

        <footer className="grow min-h-[120px] pt-4">
          <Divider />
          <span>Footer goes here</span>
        </footer>
      </body>
    </html>
  );
}
