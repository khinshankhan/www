import React from "react"
import { ContentLayout } from "@/components/layouts/content"
import { ContentPattern } from "@/components/patterns"

export default function WritingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <ContentLayout
      title="Writings"
      subtitle="My ramblings and some thoughts"
      ghPath="/app/(content)/writings/page.tsx"
    >
      {children}
      <ContentPattern />
    </ContentLayout>
  )
}
