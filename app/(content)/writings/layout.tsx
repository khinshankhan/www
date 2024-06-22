import React from "react"
import { ContentLayout } from "@/components/layouts/content"
import { ContentPattern } from "@/components/patterns"

export default function WritingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <ContentLayout title="Writings" subtitle="My ramblings and some thoughts">
      {children}
      <ContentPattern />
    </ContentLayout>
  )
}
