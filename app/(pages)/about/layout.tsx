import React, { type ReactNode } from "react"
import { PageSkeletonLayout, Toc } from "@/components/layouts"

export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <PageSkeletonLayout
      title="About"
      subtitle="Me, myself, and I"
      path="/pages/about.tsx"
      sidebar={<Toc />}
      direction="right"
    >
      {children}
    </PageSkeletonLayout>
  )
}
