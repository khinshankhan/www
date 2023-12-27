import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

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
      <body className="flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 min-h-screen relative">
        <Providers>
          <div className="flex flex-col min-h-[87vh] relative isolate">
            <nav className="sticky top-0 bg-zinc-50 dark:bg-zinc-950/[75%] backdrop-blur-sm z-1 pb-1 h-[80px]">
              <div className="container mx-auto">
                <p>Header goes here</p>
              </div>
            </nav>

            {children}
          </div>

          <footer className="grow container mx-auto pt-10">
            <p className="text-center mt-10 mb-28">
              &copy; {info.startYear}+, {info.fullname}. All rights reserved.
            </p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
