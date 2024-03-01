import React, { type ReactNode } from "react"
import { PageSkeletonLayout } from "@/components/layouts"

export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <PageSkeletonLayout
      title="Writings"
      subtitle={
        <>
          <span>{`My thoughts and ideas`}</span>
        </>
      }
      path="/app/(pages)/writings/page.tsx"
    >
      {children}
    </PageSkeletonLayout>
  )
}