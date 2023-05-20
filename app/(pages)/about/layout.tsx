import React, { type ReactNode } from "react"
import { PageSkeletonLayout } from "@/components/layouts"

export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <PageSkeletonLayout title="About" subtitle="Me, myself, and I" path="/pages/about.tsx">
      {children}
    </PageSkeletonLayout>
  )
}
