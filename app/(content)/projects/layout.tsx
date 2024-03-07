import React, { type ReactNode } from "react"
import { PageSkeletonLayout } from "@/components/layouts"

export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <PageSkeletonLayout
      title="Projects"
      subtitle={
        <>
          <span>{`Some work. Almost a portfolio?`}</span>
        </>
      }
      path="/app/(content)/projects/page.tsx"
    >
      {children}
    </PageSkeletonLayout>
  )
}
