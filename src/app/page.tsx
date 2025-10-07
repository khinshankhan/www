"use client"

import React from "react"
import { EdgeFade } from "@/components/design-system/primitives/edge-fade"
import { H1, H2, Paragraph } from "@/components/design-system/primitives/text"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { useElementSize } from "@/hooks/dimensions"

const title = "About"
const description =
  "Exploring the intersections of the online and offline worlds with curiosity, creativity, and a dash of adventure."

function ArticleContent() {
  const { ref: headerRef, rect: headerRect } = useElementSize()

  return (
    <main className="z-1 relative isolate flex grow flex-col">
      <article className="z-2 relative isolate flex w-full grow flex-col items-center">
        <header ref={headerRef} className="maxw-content fixed z-0 flex w-full flex-col gap-4 py-14">
          <H1 className="text-balance">{title}</H1>
          <Paragraph
            variant="nav"
            className="text-foreground-muted max-w-[75ch] leading-relaxed"
            render={(props) => {
              return <span {...props} />
            }}
          >
            {description}
          </Paragraph>
        </header>

        {/* acts as buffer to push content below fixed header */}
        <div
          className="starting:pb-0 transition-padding-bottom duration-1750 w-full pb-[calc(var(--pb)-48px)] ease-in-out [--d-pb:281px] md:[--d-pb:246px] lg:[--d-pb:247.5px]"
          style={
            {
              "--a-pb": headerRect.height === 0 ? "" : `${headerRect.height}px`,
              "--pb": "var(--a-pb, var(--d-pb))",
            } as React.CSSProperties
          }
        />

        {/* acts as a fade effect to gradually introduce content and hide content */}
        <EdgeFade direction="top" className="z-2 relative h-12" />

        <div className="bg-background-2 z-2 relative isolate flex w-full grow flex-col items-center justify-center">
          <div className="maxw-content relative w-full grow py-14">
            <section aria-labelledby="introduction" className="prose">
              <H2 id="introduction" className="sr-only">
                Introduction
              </H2>

              <p>Hello there. Content goes here [gets sourced from mdx files later].</p>
            </section>

            {[...Array(3).keys()].map((num) => (
              <section key={num} aria-labelledby={`section-${num}`} className="prose">
                <H2 id={`section-${num}`} className="max-w-[75ch]">
                  {`Section ${num}`}
                </H2>

                {[...Array(3).keys()].map((j) => (
                  <Paragraph key={j} className="max-w-[75ch]">
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
                    turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor
                    sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies
                    mi vitae est. Mauris placerat eleifend leo.
                  </Paragraph>
                ))}

                {num % 2 !== 0 && (
                  <figure className="flex w-full flex-col items-center justify-center gap-4">
                    <img
                      className="size-72"
                      src="https://1e709a32-0bf5-49ff-b976-d9f66716a6af.mdnplay.dev/shared-assets/images/examples/grapefruit-slice.jpg"
                      alt="Grapefruit slice atop a pile of other slices"
                    />

                    <figcaption className="text-foreground-muted flex max-w-[55ch] flex-col items-center gap-2 text-sm">
                      <Paragraph>Figure of Orange</Paragraph>
                      <Paragraph>Orange you glad?</Paragraph>
                    </figcaption>
                  </figure>
                )}
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
