import React, { type ReactNode } from "react"
import { PageSkeletonLayout } from "@/components/layouts"
import { Toc } from "@/components/layouts/sidebars"
import { getContentDataFromSlug } from "./utils"

export default function PagesLayout({
  params,
  children,
}: {
  params: { slug: string[] }
  children: ReactNode
}) {
  const { slug } = params

  const contentData = getContentDataFromSlug(slug)

  return (
    <PageSkeletonLayout
      title={contentData?.frontmatter?.title}
      subtitle={
        <>
          <span>{contentData?.frontmatter?.subtitle}</span>
        </>
      }
      path={`/content/${contentData.slug}/${contentData.computed.baseName}`}
      sidebar={
        contentData?.frontmatter?.showToc &&
        contentData?.computed?.toc && <Toc headings={contentData.computed.toc} />
      }
    >
      {children}
    </PageSkeletonLayout>
  )
}
