import React, { type ReactNode } from "react"
import Emoji from "@/components/emoji"
import { PageSkeletonLayout } from "@/components/layouts"

export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <PageSkeletonLayout
      title="Writings"
      subtitle={
        <>
          <span>{`My thoughts and ideas`}</span> <Emoji name=":thought_balloon:" />
        </>
      }
      path="/app/(pages)/writings/page.tsx"
    >
      {children}
    </PageSkeletonLayout>
  )
}
