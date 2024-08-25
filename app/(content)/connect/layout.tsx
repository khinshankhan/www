import React from "react"
import type { Metadata } from "next"
import { createMetadata } from "@/lib/seo"
import { Emoji } from "@/components/emoji"
import { ContentLayout } from "@/components/layouts/content"
import { ContentPattern } from "@/components/patterns"

export async function generateMetadata(): Promise<Metadata | undefined> {
  return createMetadata({
    title: "Connect",
    description: "Get in touch with me. Boop!",
  })
}

export default function ConnectLayout({ children }: { children: React.ReactNode }) {
  return (
    <ContentLayout
      title="Connect"
      subtitle={
        <>
          <span>{`Getting in touch. Boop`}</span> <Emoji name=":point_up_2:" />
        </>
      }
      ghPath="/app/(content)/connect/page.tsx"
    >
      {children}
      <ContentPattern />
    </ContentLayout>
  )
}
