import React from "react"
import type { Metadata } from "next"
import { DuotoneLayout } from "@/components/layouts/duotone"
import { Shell } from "@/components/layouts/elements/shell"
import { WithSidebar } from "@/components/layouts/with-sidebar"
import { createMetadata, processMarkdownAttribute } from "@/lib/seo/open-graph"
import { Callout } from "@/quicksilver/react/primitives/callout"

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
            <Callout variant="note" title="Work in Progress" icon={null}>
              This page is a work in progress. Soon, it will feature links to my socials, projects,
              and a contact method to reach out directly. Stay tuned for updates!
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
