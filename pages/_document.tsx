import React from "react";
import { Html, Head, Main, NextScript } from "next/document";
import { getCssText } from "lib/theme";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
