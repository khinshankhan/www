import React from "react"
import { PageHeader, type PageHeaderProps } from "@/components/section/page-header"
import { WithSidebar } from "@/components/section/with-sidebar"

export function ContentLayout({
  title,
  subtitle,
  children,
}: PageHeaderProps & { children: React.ReactNode }) {
  return (
    <article className="flex grow flex-col">
      <PageHeader title={title} subtitle={subtitle} />

      <div className="bounded-content-layout my-1 flex grow flex-col py-12">
        <WithSidebar
          direction="right"
          sidebar={<div>Sample sidebar plus some lorem ipsum to showcase wrapping</div>}
        >
          <div className="prose min-w-full">{children}</div>
        </WithSidebar>
      </div>
    </article>
  )
}
