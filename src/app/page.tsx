"use client"

import React, { Fragment, useState } from "react"
import { Button } from "@/components/design-system/primitives/button"
import { EdgeFade } from "@/components/design-system/primitives/edge-fade"
import { H1, H2, Paragraph } from "@/components/design-system/primitives/text"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader, siteHeaderHeight } from "@/components/layout/site-header"
import { cn } from "@/lib/utils"
import { WithSidebar } from "./with-sidebar"

const title = "Test"
const description =
  "Something really cool and impressive goes here. It'll be great, I promise. Maybe even better than great. Stay tuned!"

const tempSectionStyles = "flex flex-col md:flex-row md:items-center gap-2"

function TableOfContents() {
  return (
    <nav
      aria-label="Table of contents"
      className="prose rounded-lg px-2 py-3 backdrop-blur xl:-mt-3"
    >
      <H2 variant="h5" className="text-foreground mt-0">
        On this page
      </H2>
    </nav>
  )
}

function Content() {
  const [showOptions, setShowOptions] = useState(false)
  const [sectionsCount, setSectionCount] = useState(3)
  const [showImageOnEvenSections, setShowImageOnEvenSections] = useState(true)
  const [showImageOnEvenParagraphs, setShowImageOnEvenParagraphs] = useState(true)

  return (
    <Fragment>
      <section aria-labelledby="introduction" className="prose">
        <H2 id="introduction" className="sr-only">
          Introduction
        </H2>
        <Paragraph>{`Hello there. Content goes here [gets sourced from mdx files later].`}</Paragraph>

        <Paragraph>Testing options:</Paragraph>

        <Button onClick={() => setShowOptions((prev) => !prev)}>Toggle Options</Button>

        {showOptions && (
          <Fragment>
            <Paragraph>{`Buttons to increase/decrease sections for testing (we have ${sectionsCount}):`}</Paragraph>

            <section className={tempSectionStyles}>
              <Button accent="success" onClick={() => setSectionCount((count) => count + 1)}>
                Add Section
              </Button>
              <Button
                accent="danger"
                onClick={() => setSectionCount((count) => Math.max(0, count - 1))}
              >
                Remove Section
              </Button>
            </section>

            <Paragraph>
              Buttons to toggle showing image on even sections and/or even paragraphs:
            </Paragraph>
            <section className={tempSectionStyles}>
              <Button
                accent={showImageOnEvenSections ? "critical" : "success"}
                onClick={() => setShowImageOnEvenSections((prev) => !prev)}
              >
                {`Show on ${showImageOnEvenSections ? "Even" : "Odd"} Sections`}
              </Button>
              <Button
                accent={showImageOnEvenParagraphs ? "critical" : "success"}
                onClick={() => setShowImageOnEvenParagraphs((prev) => !prev)}
              >
                {`Show on ${showImageOnEvenParagraphs ? "Even" : "Odd"} Paragraphs`}
              </Button>
            </section>
          </Fragment>
        )}
      </section>

      {[...Array(sectionsCount).keys()].map((num) => (
        <section key={num} aria-labelledby={`section-${num}`} className="prose">
          <H2 id={`section-${num}`} className="">
            {`Section ${num}`}
          </H2>

          {[...Array(3).keys()].map((j) => (
            <Fragment key={j}>
              <Paragraph className="">
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
                egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet,
                ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.
                Mauris placerat eleifend leo.
              </Paragraph>

              {(num % 2 !== 0) === showImageOnEvenSections &&
                (j % 2 !== 0) === showImageOnEvenParagraphs && (
                  <figure className="flex w-full flex-col items-center justify-center gap-4">
                    <img
                      className="size-72"
                      src="https://1e709a32-0bf5-49ff-b976-d9f66716a6af.mdnplay.dev/shared-assets/images/examples/grapefruit-slice.jpg"
                      alt="Grapefruit slice atop a pile of other slices"
                    />

                    <figcaption className="text-foreground-muted flex flex-col items-center gap-2 text-sm">
                      <Paragraph className="">Figure of Orange</Paragraph>
                      <Paragraph>Orange you glad?</Paragraph>
                    </figcaption>
                  </figure>
                )}
            </Fragment>
          ))}
        </section>
      ))}
    </Fragment>
  )
}

function ArticleContent() {
  return (
    <main className="z-1 relative isolate flex grow flex-col">
      <article className="z-2 bg-background-1 relative isolate flex w-full grow flex-col items-center">
        <header
          className={cn(
            "maxw-content top-(--h) -z-1 sticky flex w-full flex-col gap-4 pb-2 pt-14",
            siteHeaderHeight
          )}
        >
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

        {/* acts as a fade effect to gradually introduce content and hide content */}
        <EdgeFade direction="top" className="z-2 relative h-12" />

        <div className="bg-background-2 z-2 relative isolate flex w-full grow flex-col items-center justify-center">
          <div className="maxw-content relative w-full grow py-14">
            <WithSidebar sidebar={<TableOfContents />} direction="right">
              <div className="min-w-full">
                <Content />
              </div>
            </WithSidebar>
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
      <div
        className="xs:min-h-[96vh] flex min-h-[87vh] w-full grow flex-col"
        vaul-drawer-wrapper="true"
      >
        <SiteHeader />

        <ArticleContent />
      </div>

      <SiteFooter position="static" />
    </div>
  )
}
