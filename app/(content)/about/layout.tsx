import React from "react"
import { ContentLayout } from "@/components/layouts/content"
import { Toc } from "@/components/layouts/sidebars/toc"

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <ContentLayout title="About" subtitle="Me, myself, and I" sidebar={<Toc />}>
      {children}
    </ContentLayout>
  )
}
