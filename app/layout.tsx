import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { cn } from "lib/utils";
import Link from "next/link";

export const metadata: Metadata = {};

function Navbar() {
  return <nav>Navbar</nav>;
}

function Footer() {
  return (
    <>
      <hr />
      <footer className="text-center">Footer</footer>
    </>
  );
}

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
        <div className="flex flex-col min-h-[87vh]">
          <Navbar />
          <div className="flex flex-col items-center grow">{children}</div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
