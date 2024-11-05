import React from "react"
import { PageHeader, type PageHeaderProps } from "@/components/section/page-header"

export function ContentLayout({
  title,
  subtitle,
  children,
}: PageHeaderProps & { children: React.ReactNode }) {
  return (
    <article className="flex grow flex-col">
      <PageHeader title={title} subtitle={subtitle} />

      <div className="bounded-content-layout my-1 grow py-12">
        <div className="prose min-w-full">{children}</div>
      </div>
    </article>
  )
}
