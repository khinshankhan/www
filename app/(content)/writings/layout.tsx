import React from "react"
import type { Metadata } from "next"
import { createMetadata } from "@/lib/seo"
import { ContentLayout } from "@/components/layouts/content"
import { ContentPattern } from "@/components/patterns"

export async function generateMetadata(): Promise<Metadata | undefined> {
  return createMetadata({
    title: "Writings",
    description: "Read my ramblings and some thoughts.",
  })
}

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
