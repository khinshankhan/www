"use client"

import React, { Fragment, useState } from "react"
import { Button } from "@/components/design-system/primitives/button"
import { H2, Paragraph } from "@/components/design-system/primitives/text"
import { AppShell } from "@/components/layout/app-shell"
import { DuoLayout } from "@/components/layout/duo-layout"
import { WithSidebar } from "@/components/layout/with-sidebar"

const title = "Test"
const description =
  "Something really cool and impressive goes here. It'll be great, I promise. Maybe even better than great. Stay tuned!"

const tempSectionStyles = "flex flex-col md:flex-row md:items-center gap-2"

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

export default function Home() {
  return (
    <AppShell>
      <DuoLayout title={title} description={description} ghPath={"/src/app/page.tsx"}>
        <WithSidebar sidebar={null} direction="right">
          <div className="mx-auto min-w-full">
            <Content />
          </div>
        </WithSidebar>
      </DuoLayout>
    </AppShell>
  )
}
