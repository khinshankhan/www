import React from "react"
import type { Metadata } from "next"
import { DuotoneLayout } from "@/components/layouts/duotone"
import { Shell } from "@/components/layouts/elements/shell"
import { WithSidebar } from "@/components/layouts/with-sidebar"
import { createMetadata, processMarkdownAttribute } from "@/lib/seo/open-graph"
import { Callout } from "@/quicksilver/react/primitives/callout"
import { Link } from "@/quicksilver/react/primitives/link"

const title = "Projects"
const description =
  "A collection of my tinkering, experiments, and explorations from the creative nebula and beyond -- a sidequest within a sidequest, endlessly unfolding."
const ghPath = "/app/(duotone)/projects/page.tsx"
const slug = "/projects"

export default function Page() {
  return (
    <Shell>
      <DuotoneLayout title={title} description={description} ghPath={ghPath}>
        <WithSidebar sidebar={null} direction="right">
          <div className="mx-auto min-w-full">
            <Callout variant="note" title="Work in Progress" icon={null}>
              I am currently in the process of revamping my projects and website. Follow the journey
              on <Link href="https://github.com/khinshankhan/www">GitHub</Link>. Progress is steady
              but slow &mdash; stay tuned for more updates coming soon!
            </Callout>
          </div>
        </WithSidebar>
      </DuotoneLayout>
    </Shell>
  )
}

export function generateMetadata(): Metadata | undefined {
  return createMetadata({
    title,
    description: processMarkdownAttribute(description),
    slug,
  })
}
