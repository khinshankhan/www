import React, { type ReactNode } from "react"
import Emoji from "@/components/emoji"
import { PageSkeletonLayout } from "@/components/layouts"

export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <PageSkeletonLayout
      title="Contact"
      subtitle={
        <>
          <span>{`Getting in touch. Boop`}</span> <Emoji name=":point_up_2:" />
        </>
      }
      path="/app/(site)/(pages)/contact/page.tsx"
    >
      {children}
    </PageSkeletonLayout>
  )
}
