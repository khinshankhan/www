import type { Metadata } from "next";
import "./globals.css";

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
        <div className="flex flex-col min-h-[87vh] relative isolate">
          <nav className="sticky top-0 bg-white dark:bg-zinc-950/[80%] backdrop-blur-md z-1 pb-1 h-[80px]">
            <div className="container mx-auto">
              <p>Header goes here</p>
            </div>
          </nav>

          <div className="grow relative z-0 pt-6 bg-zinc-900">
            <div className="container mx-auto">{children}</div>
            <div className="pt-10"></div>
          </div>
        </div>

        <footer className="grow container mx-auto pt-10">
          <p className="text-center mb-28">
            &copy; {info.startYear}+, {info.fullname}. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
