"use client"

import React from "react"
import { EdgeFade } from "@/components/design-system/primitives/edge-fade"
import { typographyVariants } from "@/components/design-system/primitives/text"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { useElementSize } from "@/hooks/dimensions"
import { cn } from "@/lib/utils"

const title = "About"
const description =
  "Exploring the intersections of the online and offline worlds with curiosity, creativity, and a dash of adventure."

function ArticleContent() {
  const { ref: headerRef, rect: headerRect } = useElementSize()

  return (
    <main className="z-1 relative isolate flex grow flex-col">
      <article className="z-2 relative isolate flex w-full grow flex-col items-center">
        <header ref={headerRef} className="maxw-content fixed z-0 flex w-full flex-col gap-4 py-14">
          <h1 className={cn(typographyVariants({ variant: "h1" }), "text-balance")}>{title}</h1>
          <p
            className={cn(
              typographyVariants({ variant: "nav" }),
              "text-foreground-muted max-w-[75ch] leading-relaxed"
            )}
          >
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
              <section key={num} aria-labelledby={`section-${num}`} className="flex flex-col gap-4">
                <h2
                  id={`section-${num}`}
                  className={cn(typographyVariants({ variant: "h2" }), "max-w-[75ch] pt-8")}
                >
                  {`Section ${num}`}
                </h2>
                <p className={cn(typographyVariants({ variant: "body" }), "max-w-[75ch]")}>
                  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
                  turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit
                  amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi
                  vitae est. Mauris placerat eleifend leo.
                </p>

                <figure className="flex w-full flex-col items-center justify-center gap-4">
                  <img
                    className="size-72"
                    src="https://1e709a32-0bf5-49ff-b976-d9f66716a6af.mdnplay.dev/shared-assets/images/examples/grapefruit-slice.jpg"
                    alt="Grapefruit slice atop a pile of other slices"
                  />

                  <figcaption className="text-foreground-muted flex max-w-[55ch] flex-col items-center gap-2 text-sm">
                    <p>Figure of Orange</p>
                    <p>Orange you glad?</p>
                  </figcaption>
                </figure>
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
    <div className="isolate flex min-h-screen w-full grow flex-col">
      <div className="xs:min-h-[96vh] flex min-h-[87vh] w-full grow flex-col">
        <SiteHeader />

        <ArticleContent />
      </div>

      <SiteFooter position="static" />
    </div>
  )
}
