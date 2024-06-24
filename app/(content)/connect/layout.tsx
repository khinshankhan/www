import React from "react"
import { Emoji } from "@/components/emoji"
import { ContentLayout } from "@/components/layouts/content"
import { ContentPattern } from "@/components/patterns"

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
