"use client"

import React from "react"
import { EdgeFade } from "@/components/design-system/primitives/edge-fade"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { useElementSize } from "@/hooks/dimensions"

const title = "About"
const description =
  "Exploring the intersections of the online and offline worlds with curiosity, creativity, and a dash of adventure."

function ArticleContent() {
  const { ref: headerRef, rect: headerRect } = useElementSize()

  return (
    <main className="text-foreground z-1 relative isolate flex grow flex-col">
      <article className="z-2 relative isolate flex w-full grow flex-col items-center">
        <header ref={headerRef} className="maxw-content fixed z-0 flex w-full flex-col gap-4 py-14">
          <h1 className="text-foreground scroll-m-20 text-balance text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
            {title}
          </h1>
          <p className="text-foreground-muted text-balance text-xl font-medium leading-relaxed lg:text-2xl">
            {description}
          </p>
        </header>

        {/* acts as buffer to gradually hide fixed header, also gives header breathing room from content */}
        <EdgeFade
          direction="top"
          className="z-2 relative h-12"
          style={{
            marginTop: `${Math.max(headerRect.height, 246) - 48}px`,
          }}
        />

        <div className="bg-background-2 z-2 relative isolate flex w-full grow flex-col items-center justify-center">
          <div className="maxw-content relative flex w-full grow flex-col gap-2 py-14">
            <section aria-labelledby="introduction" className="flex flex-col gap-2">
              <h2 id="introduction" className="sr-only pt-8 text-2xl font-bold">
                Introduction
              </h2>

              <p>Hello there. Content goes here [gets sourced from mdx files later].</p>
            </section>

            {[...Array(3).keys()].map((num) => (
              <section key={num} aria-labelledby={`section-${num}`} className="flex flex-col gap-2">
                <h2 id={`section-${num}`} className="text-foreground pt-8 text-2xl font-bold">
                  {`Section ${num}`}
                </h2>
                <p>
                  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
                  turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit
                  amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi
                  vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien
                  ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare
                  sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum
                  rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar
                  facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque
                  egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi,
                  tincidunt quis, accumsan porttitor, facilisis luctus, metus
                </p>
              </section>
            ))}
          </div>
        </div>
      </article>

      <div className="z-1 flex w-full flex-col items-center pt-14">
        <div className="maxw-page w-full text-center md:px-4 md:text-end">
          [Link to specific article page goes here]
        </div>
      </div>
    </main>
  )
}

export default function Home() {
  return (
    <div className="flex min-h-screen w-full grow flex-col">
      <div className="xs:min-h-[96vh] flex min-h-[87vh] w-full grow flex-col">
        <SiteHeader />

        <ArticleContent />
      </div>

      <SiteFooter position="static" />
    </div>
  )
}
