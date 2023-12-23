import type { Metadata } from "next";
import "./globals.css";
import { Divider } from "@/components/primitives/divider";

export const metadata: Metadata = {};

const info = {
  fullname: "Khinshan Khan",
  startYear: 2017,
};

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

        <footer className="grow min-h-[160px] pt-10 container mx-auto">
          <Divider />
          <p className="text-center pt-6">
            &copy; {info.startYear}+, {info.fullname}. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
