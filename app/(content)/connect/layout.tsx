import React, { type ReactNode } from "react"
import { PageSkeletonLayout } from "@/components/layouts"

export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <PageSkeletonLayout
      title="Connect"
      subtitle={
        <>
          <span>{`Getting in touch. Boop`}</span>
        </>
      }
      path="/app/(content)/connect/page.tsx"
    >
      {children}
    </PageSkeletonLayout>
  )
}
