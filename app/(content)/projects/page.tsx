import React from "react"
import type { Metadata } from "next"
import { Callout } from "@/components/composite/callout"
import { SmartLink } from "@/components/composite/smart-link"
import { ContentLayout } from "@/components/template/content-layout"
import { processMarkdown } from "@/lib/content"
import { createMetadata } from "@/lib/seo"

const title = "Projects"
const description =
  "A collection of my tinkering, experiments, and explorations from the creative nebula and beyond -- a sidequest within a sidequest, endlessly unfolding."
const slug = "/projects"

export default async function Page() {
  return (
    <ContentLayout
      title={title}
      description={description}
      ghPath="/app/(content)/projects/page.tsx"
      childrenWrappingClass="flex flex-col gap-4"
    >
      <Callout variant="note" title="Work in Progress" icon={null}>
        I am currently in the process of revamping my projects and website. Follow the journey on{" "}
        <SmartLink href="https://github.com/khinshankhan/www">GitHub</SmartLink>. Progress is steady
        but slow &mdash; stay tuned for more updates coming soon!
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
