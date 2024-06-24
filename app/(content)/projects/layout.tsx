import React from "react"
import { ContentLayout } from "@/components/layouts/content"
import { ContentPattern } from "@/components/patterns"

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <ContentLayout title="Projects" subtitle="Some work. Almost a portfolio?">
      {children}
      <ContentPattern />
    </ContentLayout>
  )
}
