import React, { type ReactNode } from "react"
import { notFound } from "next/navigation"
import { Computed } from "@/lib/contentlayer/documents"
import { PageSkeletonLayout, Toc } from "@/components/layouts"
import { getPageFromParams, type PageProps } from "./utils"

interface PageLayoutProps extends PageProps {
  children: ReactNode
}

export default async function PagesLayout({ children, params }: PageLayoutProps) {
  const page = await getPageFromParams(params)

  if (!page) {
    notFound()
  }

  const computed = page.computed as Computed

  return (
    <PageSkeletonLayout
      title={computed.frontmatter.title}
      subtitle={computed.frontmatter.subtitle}
      path={`/data/${page._raw.sourceFilePath}`}
      sidebar={<Toc headings={computed.headings} />}
      className="normalize"
    >
      {children}
    </PageSkeletonLayout>
  )
}
