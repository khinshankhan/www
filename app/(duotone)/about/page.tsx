"use client"

import React from "react"
import { DuotoneLayout } from "@/components/layouts/duotone"
import { Header } from "@/components/layouts/elements/header"
import { Shell } from "@/components/layouts/elements/shell"
import { TOC, type Heading } from "@/components/layouts/sidebars/toc"
import { WithSidebar } from "@/components/layouts/with-sidebar"
import { Figcaption } from "@/quicksilver/react/primitives/figcaption"
import { Figure } from "@/quicksilver/react/primitives/figure"
import { Image } from "@/quicksilver/react/primitives/image"
import { Link } from "@/quicksilver/react/primitives/link"
import { Spoiler } from "@/quicksilver/react/primitives/spoiler"
import { H2 } from "@/quicksilver/react/primitives/text"
import { Video } from "@/quicksilver/react/primitives/video"

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

              <Figure>
                <Image
                  src="https://media1.tenor.com/m/iGSIl1am6BMAAAAC/fat-albert-saturday.gif"
                  alt="Saturday Vibes"
                  width="498"
                  height="381"
                />

                <Figcaption>
                  Saturday Vibes{" "}
                  <Link href="https://tenor.com/view/fat-albert-saturday-gif-9828130470404483091">
                    (from Tenor)
                  </Link>
                </Figcaption>
              </Figure>

              <p className="">
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
                egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet,
                ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.
                Mauris placerat eleifend leo.
              </p>

              <Figure>
                <Video
                  src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
                  poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
                  width="620"
                >
                  Sorry, your browser doesn't support embedded videos, but don't worry, you can
                  <Link href="https://archive.org/details/BigBuckBunny_124">download it</Link>
                  and watch it with your favorite video player!
                </Video>

                <Figcaption>
                  Example 1 from{" "}
                  <Link href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#examples">
                    MDN Web Docs
                  </Link>
                </Figcaption>
              </Figure>

              <p className="">
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
                egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet,
                ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.
                Mauris placerat eleifend leo.
              </p>

              <p className="">
                <Spoiler>Pellentesque habitant morbi </Spoiler> tristique senectus et netus et
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
