import React from "react";
import { Divider } from "components/primitives";

function Navbar() {
  return <nav>Navbar</nav>;
}

function Footer() {
  return (
    <>
      <Divider lineClassName="w-[87%]" />
      <footer className="text-center mt-4">Footer</footer>
    </>
  );
}

export function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col min-h-[87vh]">
        <Navbar />
        <div className="flex flex-col items-center grow">{children}</div>
      </div>
      <Footer />
    </>
  );
}
