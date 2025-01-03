import React from "react"
import { Callout } from "@/components/composite/callout"
import { ContentLayout } from "@/components/template/content-layout"

export default async function Page() {
  return (
    <ContentLayout
      title="Connect"
      description="A hub to connect with me -- links, socials, and a space to say hello. Whether it's to collaborate, chat, or share ideas, I'd love to hear from you!"
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
