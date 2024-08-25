import React from "react"
import type { Metadata } from "next"
import { createMetadata } from "@/lib/seo"
import { ContentLayout } from "@/components/layouts/content"
import { ContentPattern } from "@/components/patterns"

export async function generateMetadata(): Promise<Metadata | undefined> {
  return createMetadata({
    title: "Projects",
    description: "Some work I've done. Almost a portfolio? Maybe...",
  })
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <ContentLayout
      title="Projects"
      subtitle="Some work. Almost a portfolio?"
      ghPath="/app/(content)/projects/page.tsx"
    >
      {children}
      <ContentPattern />
    </ContentLayout>
  )
}
