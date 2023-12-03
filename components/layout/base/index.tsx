import React from "react";

function Navbar() {
  return <nav>Navbar</nav>;
}

function Footer() {
  return (
    <>
      <hr />
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
