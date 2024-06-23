import React from "react"
import { ContentLayout } from "@/components/layouts/content"
import { Toc } from "@/components/layouts/sidebars/toc"
import { ContentPattern } from "@/components/patterns"

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <ContentLayout title="Stuffz" subtitle="subz" sidebar={<Toc />}>
      {children}

      <ContentPattern />
    </ContentLayout>
  )
}
