"use client"

import React from "react"
import { DuotoneLayout } from "@/components/layouts/duotone"
import { Header } from "@/components/layouts/elements/header"
import { Shell } from "@/components/layouts/elements/shell"
import { TOC, type Heading } from "@/components/layouts/sidebars/toc"
import { WithSidebar } from "@/components/layouts/with-sidebar"
import { Link } from "@/quicksilver/react/primitives/link"
import { H2 } from "@/quicksilver/react/primitives/text"

const title = "About"
const description =
  "Exploring the intersections of the online and offline worlds with curiosity, creativity, and a dash of adventure."
const ghPath = "/app/(duotone)/about/page.tsx"

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
    <Shell
      header={
        <Header
          edgeFadeProps={{
            className: "hidden xl:block",
          }}
        />
      }
    >
      <DuotoneLayout title={title} description={description} ghPath={ghPath}>
        <WithSidebar sidebar={<TOC headings={headings} />} direction="right">
          <div className="mx-auto min-w-full">
            <section aria-labelledby="introduction" className="prose">
              <H2 id="introduction" className="sr-only scroll-mt-72">
                <Link className="anchor-link" href="#introduction">
                  Introduction
                </Link>
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
                    <Link className="anchor-link" href={`#section-${num}`}>
                      {`Section ${num}`}
                    </Link>
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
      </DuotoneLayout>
    </Shell>
  )
}
