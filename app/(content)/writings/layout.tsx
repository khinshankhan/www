import React from "react"
import { ContentLayout } from "@/components/layouts/content"

export default function WritingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <ContentLayout title="Writings" subtitle="My ramblings and some thoughts">
      {children}
    </ContentLayout>
  )
}
