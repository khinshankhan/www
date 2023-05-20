import React, { type ReactNode } from "react"
import { PageSkeletonLayout } from "@/components/layouts"

export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <PageSkeletonLayout title="Writings" subtitle="My thoughts and ideas">
      {children}
    </PageSkeletonLayout>
  )
}
