import React from "react"
import type { Metadata } from "next"
import { DuotoneLayout } from "@/components/layouts/duotone"
import { Shell } from "@/components/layouts/elements/shell"
import { WithSidebar } from "@/components/layouts/with-sidebar"
import { createMetadata } from "@/lib/seo/open-graph"

const title = "Writings"
const description =
  "A collection of my ramblings, thoughts, and half-baked explorations -- a sidequest that gets updated once in a blue moon."
const ghPath = "/app/(duotone)/writings/page.tsx"
const slug = "/writings"

export default function Page() {
  return (
    <Shell>
      <DuotoneLayout title={title} description={description} ghPath={ghPath}>
        <WithSidebar sidebar={null} direction="right">
          <div className="mx-auto min-w-full">
            <div className="prose max-w-none text-foreground-muted">
              <p>Coming soon...</p>
            </div>
          </div>
        </WithSidebar>
      </DuotoneLayout>
    </Shell>
  )
}

export function generateMetadata(): Metadata | undefined {
  return createMetadata({
    title,
    // TODO: process to interweave emoji and special characters correctly
    description,
    slug,
  })
}
