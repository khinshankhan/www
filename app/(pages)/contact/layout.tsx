import React, { type ReactNode } from "react"
import { PageSkeletonLayout } from "@/components/layouts"

export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <PageSkeletonLayout
      title="Contact"
      subtitle="Getting in touch. Boop."
      path="/app/(pages)/contact/page.tsx"
    >
      {children}
    </PageSkeletonLayout>
  )
}
