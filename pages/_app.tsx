import type { AppProps } from "next/app"
import Head from "next/head"

import { ThemeProvider } from "components/providers"
import "styles/globals.css"
import { Montserrat, Nobile } from "@next/font/google"
import { AnimatePresence, LazyMotion, domAnimation } from "framer-motion"

import { cx } from "lib/utils"

import { BaseLayout as Layout } from "components/layouts"

const headingFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
})
const bodyFont = Nobile({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "700"],
})

export default function App({ Component, pageProps, router }: AppProps) {
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
      <div id="fonts" className={cx(headingFont.variable, bodyFont.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LazyMotion features={domAnimation} strict>
            <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
              <Layout isHero={isHero}>
                <Component key={router.asPath} {...pageProps} />
              </Layout>
            </AnimatePresence>
          </LazyMotion>
        </ThemeProvider>
      </div>
    </>
  )
}
