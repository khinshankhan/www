import React, { type ReactNode } from "react"
import Emoji from "@/components/emoji"
import { PageSkeletonLayout } from "@/components/layouts"

export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <PageSkeletonLayout
      title="Projects"
      subtitle={
        <>
          <span>{`Some work. Almost a portfolio`}</span> <Emoji name=":dancer:" />
        </>
      }
      path="/app/(site)/(pages)/projects/page.tsx"
    >
      {children}
    </PageSkeletonLayout>
  )
}
