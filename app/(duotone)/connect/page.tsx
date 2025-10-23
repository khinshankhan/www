import React from "react"
import type { Metadata } from "next"
import { DuotoneLayout } from "@/components/layouts/duotone"
import { Shell } from "@/components/layouts/elements/shell"
import { WithSidebar } from "@/components/layouts/with-sidebar"
import { createMetadata } from "@/lib/seo/open-graph"

const title = "Connect"
const description =
  "A hub to connect with me -- links, socials, and a space to say hello. Whether it's to collaborate, chat, or share ideas, I'd love to hear from you!"
const ghPath = "/app/(duotone)/connect/page.tsx"
const slug = "/connect"

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
