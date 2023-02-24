import type { AppProps } from "next/app"
import Head from "next/head"

import { ThemeProvider } from "components/providers"
import "styles/globals.css"
import { BaseLayout as Layout } from "components/layouts"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="viewport-fit=cover, width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  )
}
