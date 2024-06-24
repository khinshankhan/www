import React, { type ReactNode } from "react"
import { ContentLayout } from "@/components/layouts/content"
import { Toc } from "@/components/layouts/sidebars/toc"
import { ContentPattern } from "@/components/patterns"
import { getContentDataFromSlug } from "./utils"

export default async function PagesLayout({
  params,
  children,
}: {
  params: { slug: string[] }
  children: ReactNode
}) {
  const { slug } = params
  const contentData = await getContentDataFromSlug(slug)

  return (
    <ContentLayout
      title={contentData?.frontmatter?.title}
      subtitle={
        <>
          <span>{contentData?.frontmatter?.subtitle}</span>
        </>
      }
      ghPath={`/content/${contentData.slug}/${contentData.computed.baseName}`}
      sidebar={
        contentData?.frontmatter?.showToc && (
          <Toc
            headings={contentData.computed.toc}
            markExcerpt={contentData.frontmatter.markExcerpt}
          />
        )
      }
    >
      {children}

      <ContentPattern />
    </ContentLayout>
  )
}
