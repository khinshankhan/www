import fs from "fs"
import React from "react"
import { notFound } from "next/navigation"
import { Toc } from "@/components/section/toc"
import { ContentLayout } from "@/components/template/content-layout"
import { MDXRenderer } from "@/components/template/mdx-renderer"
import { getContentDataBySlug, listAllContentData, resolveFilePath } from "@/lib/content"
import { cn } from "@/lib/utils"

export async function generateStaticParams() {
  const slugsParts = (await listAllContentData({})).map((contentData) => {
    return {
      slug: contentData.slug.split("/"),
    }
  })

  return slugsParts
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const { slug } = await params

  const possibleContentData = await Promise.all(
    // HACK: totally fails i18n and the sort, surely there's a better way to go about this
    // but we need to prioritize content delivery for now, we can circle back to this later
    ["page.md", "page.mdx"].map(async (possibleFilename) => {
      const fileSlug = [...slug, possibleFilename]
      const filePath = resolveFilePath(fileSlug)
      if (!fs.existsSync(filePath)) {
        return null
      }

      return getContentDataBySlug({ fileSlug })
    })
  )

  const contentData = possibleContentData.find((contentData) => contentData !== null)
  if (!contentData) {
    notFound()
  }

  return (
    <ContentLayout
      title={contentData.frontmatter.title}
      subtitle={contentData.frontmatter.subtitle}
      ghPath={`/content/${contentData.slug}/${contentData.computed.baseName}`}
      childrenWrappingClass={cn("prose", contentData.frontmatter.showToc && "mt-6 xl:mt-2")}
      sidebar={contentData.frontmatter.showToc && <Toc headings={contentData.computed.toc} />}
    >
      <MDXRenderer source={contentData.content} />
    </ContentLayout>
  )
}
