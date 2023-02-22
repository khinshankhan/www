import React from "react"
import { Head, Html, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head>
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
