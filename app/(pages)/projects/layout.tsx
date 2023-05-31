import React, { type ReactNode } from "react"
import { PageSkeletonLayout } from "@/components/layouts"

export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <PageSkeletonLayout
      title="Projects"
      subtitle="Some work. Almost a portfolio."
      path="/app/(pages)/projects/page.tsx"
    >
      {children}
    </PageSkeletonLayout>
  )
}
