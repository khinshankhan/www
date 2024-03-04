import React, { type ReactNode } from "react"
import { PageSkeletonLayout } from "@/components/layouts"

export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <PageSkeletonLayout
      title="Aboutti"
      subtitle={
        <>
          <span>{`Me me and me`}</span>
        </>
      }
      path="/app/content/about/page.mdx"
    >
      {children}
    </PageSkeletonLayout>
  )
}
