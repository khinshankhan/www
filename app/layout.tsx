import "./globals.css";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <p>Hello there!</p>
        {children}
      </body>
    </html>
  );
}
