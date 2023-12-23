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
      <body className="flex flex-col bg-white dark:bg-zinc-950 text-zinc-950 dark:text-white min-h-screen relative">
        <div className="flex flex-col min-h-[87vh] relative isolate">
          <nav className="sticky top-0 bg-white dark:bg-zinc-950/[80%] backdrop-blur-md z-1 pb-1">
            <div className="container mx-auto">
              <p>Header goes here</p>
            </div>
          </nav>

          <div className="grow flex flex-col container mx-auto relative z-0 pt-6">
            {children}
          </div>
        </div>

        <footer className="grow min-h-[120px] pt-4">
          <Divider />
          <span>Footer goes here</span>
        </footer>
      </body>
    </html>
  );
}
