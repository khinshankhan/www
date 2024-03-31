import React, { type ReactNode } from "react"
import { getContentData } from "@/lib/content"
import { PageSkeletonLayout } from "@/components/layouts"
import { Toc } from "@/components/layouts/sidebars"

export default function PagesLayout({
  params,
  children,
}: {
  params: { slug: string[] }
  children: ReactNode
}) {
  const { slug } = params
  const slugPath = slug.join("/")

  // TODO: turn this to support `"**/page*.mdx"` when dealing with i18n
  // eg page.es.mdx will be spanish
  const filePath = `${slugPath}/page.mdx`

  const contentData = getContentData(filePath)

  return (
    <PageSkeletonLayout
      title={contentData?.frontmatter?.title}
      subtitle={
        <>
          <span>{contentData?.frontmatter?.subtitle}</span>
        </>
      }
      path={`content/${slugPath}/page.tsx`}
      sidebar={
        contentData?.frontmatter?.showToc &&
        contentData?.computed?.toc && <Toc headings={contentData.computed.toc} />
      }
    >
      {children}
    </PageSkeletonLayout>
  )
}
