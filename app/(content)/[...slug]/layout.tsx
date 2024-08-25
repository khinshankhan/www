import React, { type ReactNode } from "react"
import type { Metadata } from "next"
import type { ContentSource } from "@/schemas/content"
import { createMetadata, type OpenGraphObject } from "@/lib/seo"
import { ContentLayout } from "@/components/layouts/content"
import { Toc } from "@/components/layouts/sidebars/toc"
import { ContentPattern } from "@/components/patterns"
import { getContentDataFromSlug } from "./utils"

const contentSourceToOpenGraphType: Record<ContentSource, OpenGraphObject["type"]> = {
  root: "website",
  writings: "article",
  projects: "article",
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata | undefined> {
  const { slug } = params
  const contentData = await getContentDataFromSlug(slug)
  const title = contentData.frontmatter.title
  const description = contentData.frontmatter.description

  return createMetadata({
    title,
    description,
    openGraph: (og) => ({
      ...og,
      type: contentSourceToOpenGraphType[contentData.source],
    }),
  })
}

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
