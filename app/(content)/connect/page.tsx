import React from "react"
import type { Metadata } from "next"
import { Callout } from "@/components/composite/callout"
import { ContentLayout } from "@/components/template/content-layout"
import { processMarkdown } from "@/lib/content"
import { createMetadata } from "@/lib/seo"

const title = "Connect"
const description =
  "A hub to connect with me -- links, socials, and a space to say hello. Whether it's to collaborate, chat, or share ideas, I'd love to hear from you!"
const slug = "/connect"

export default async function Page() {
  return (
    <ContentLayout
      title={title}
      description={description}
      ghPath="/app/(content)/projects/page.tsx"
      childrenWrappingClass="flex flex-col gap-4"
    >
      <Callout variant="note" title="Work in Progress" icon={null}>
        This page is a work in progress. Soon, it will feature links to my socials, projects, and a
        contact method to reach out directly. Stay tuned for updates!
      </Callout>
    </ContentLayout>
  )
}

export async function generateMetadata(): Promise<Metadata | undefined> {
  return createMetadata({
    title,
    description: processMarkdown(description).excerpt,
    slug,
  })
}
