"use client"

import React from "react"
import { Link } from "@/components/design-system/primitives/link"
import { H2 } from "@/components/design-system/primitives/text"
import { AppShell } from "@/components/layout/app-shell"
import { DuoLayout } from "@/components/layout/duo-layout"
import { Heading, TOC } from "@/components/layout/toc"
import { WithSidebar } from "@/components/layout/with-sidebar"

const title = "About"
const description =
  "Exploring the intersections of the online and offline worlds with curiosity, creativity, and a dash of adventure."

export default function Page() {
  const sectionsCount = 5

  const headings: Heading[] = [
    { id: "introduction", title: "Introduction", depth: 2 },
    ...[...Array(sectionsCount).keys()].map((num) => ({
      id: `section-${num}`,
      title: `Section ${num}`,
      depth: 2,
    })),
  ]

  return (
    <AppShell
      siteHeaderProps={{
        edgeFadeProps: {
          className: "hidden xl:block",
        },
      }}
    >
      <DuoLayout title={title} description={description} ghPath={"/src/app/(duo)/about/page.tsx"}>
        <WithSidebar sidebar={<TOC headings={headings} />} direction="right">
          <div className="mx-auto min-w-full">
            <section aria-labelledby="introduction" className="prose">
              <H2 id="introduction" className="sr-only scroll-mt-72">
                Introduction
              </H2>
              <p>
                Introductory paragraph goes here. No sweat, should be short and sweet, super simple
                (famous last words). Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies
                eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean
                ultricies mi vitae est. Mauris placerat eleifend leo.
              </p>
              <p className="">
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
                egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet,
                ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.
                Mauris placerat eleifend leo.
              </p>
              <p className="">
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
                egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet,
                ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.
                Mauris placerat eleifend leo.
              </p>
            </section>

            {[...Array(sectionsCount).keys()].map((num) => {
              return (
                <section key={num} aria-labelledby={`section-${num}`} className="prose">
                  <H2 id={`section-${num}`} className="scroll-mt-28">
                    <Link className="anchor-link">{`Section ${num}`}</Link>
                  </H2>

                  <p className="">
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
                    turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor
                    sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies
                    mi vitae est. Mauris placerat eleifend leo.
                  </p>
                  <p className="">
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
                    turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor
                    sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies
                    mi vitae est. Mauris placerat eleifend leo.
                  </p>
                  <p className="">
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
                    turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor
                    sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies
                    mi vitae est. Mauris placerat eleifend leo.
                  </p>
                </section>
              )
            })}
          </div>
        </WithSidebar>
      </DuoLayout>
    </AppShell>
  )
}
