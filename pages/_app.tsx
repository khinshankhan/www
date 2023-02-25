import type { AppProps } from "next/app"
import Head from "next/head"

import { ThemeProvider } from "components/providers"
import "styles/globals.css"
import { AnimatePresence } from "framer-motion"

import { BaseLayout as Layout } from "components/layouts"

export default function App({ Component, pageProps }: AppProps) {
  // I'm confident I'll use it for homepage at least
  // @ts-ignore
  const isHero = Component?.isHero ?? false

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
        <Layout isHero={isHero}>
          <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
            <Component {...pageProps} />
          </AnimatePresence>
        </Layout>
      </ThemeProvider>
    </>
  )
}
