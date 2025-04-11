import fs from "fs"
import React from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Toc } from "@/components/section/toc"
import { ContentLayout } from "@/components/template/content-layout"
import { MDXRenderer } from "@/components/template/mdx-renderer"
import {
  getContentDataBySlug,
  listAllContentData,
  processMarkdown,
  resolveFilePath,
} from "@/lib/content"
import { createMetadata } from "@/lib/seo"
import { cn } from "@/lib/utils"

export async function generateStaticParams() {
  const slugsParts = (await listAllContentData({})).map((contentData) => {
    return {
      slug: contentData.slug.split("/"),
    }
  })

  return slugsParts
}

async function getResolvedContentData(slug: string[]) {
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

  return possibleContentData.find((contentData) => contentData !== null)
}

type tParams = Promise<{ slug: string[] }>

export default async function Page(props: { params: tParams }) {
  const { slug } = await props.params
  const contentData = await getResolvedContentData(slug)
  if (!contentData) {
    notFound()
  }

  return (
    <ContentLayout
      title={contentData.frontmatter.title}
      description={contentData.frontmatter.description}
      ghPath={`/content/${contentData.slug}/${contentData.computed.baseName}`}
      childrenWrappingClass={cn(
        "prose [&>*]:max-w-[55ch] max-xl:[&>*]:mx-auto",
        contentData.frontmatter.showToc ? "mt-6 xl:mt-2" : "[&>*]:mx-auto"
      )}
      sidebar={contentData.frontmatter.showToc && <Toc headings={contentData.computed.toc} />}
      sidebarClassName="mx-auto max-w-[55ch] sticky top-4"
    >
      <MDXRenderer source={contentData.content} />
    </ContentLayout>
  )
}

type Props = {
  params: Promise<{ slug: string[] }>
}
export async function generateMetadata({ params }: Props): Promise<Metadata | undefined> {
  const fileSlug = (await params).slug
  const contentData = await getResolvedContentData(fileSlug)
  if (!contentData) {
    throw new Error(`Could not find metadata for ${fileSlug.join()}`)
  }

  return createMetadata({
    title: contentData.frontmatter.title,
    description: processMarkdown(contentData.frontmatter.description).excerpt,
    slug: "/" + resolveFilePath(fileSlug, ""),
  })
}
