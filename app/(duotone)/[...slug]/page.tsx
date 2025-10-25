import React from "react"
import type { Metadata } from "next"
import { DuotoneLayout } from "@/components/layouts/duotone"
import { Header } from "@/components/layouts/elements/header"
import { Shell } from "@/components/layouts/elements/shell"
import { TOC } from "@/components/layouts/sidebars/toc"
import { WithSidebar } from "@/components/layouts/with-sidebar"
import { MDXRenderer } from "@/components/mdx-renderer"
import { getAllContentData, getContentDataBySlug } from "@/lib/content/source"
import { createMetadata, processMarkdownAttribute } from "@/lib/seo/open-graph"

export async function generateStaticParams() {
  const list = await getAllContentData()
  const slugsParts = list.map((contentData) => {
    return {
      slug: contentData.slug.split("/").filter((part) => part.trim() !== ""),
    }
  })

  return slugsParts
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const fileSlug = (await params).slug
  const realFileSlug = `/${fileSlug.join("/")}/`
  const contentData = await getContentDataBySlug(realFileSlug)
  if (!contentData) {
    throw new Error(`Could not find metadata for ${realFileSlug}`)
  }

  return (
    <Shell
      header={
        <Header
          edgeFadeProps={{
            className: contentData.frontmatter.showToc ? "hidden xl:block" : "",
          }}
        />
      }
    >
      <DuotoneLayout
        title={contentData.frontmatter.title}
        description={contentData.frontmatter.description}
        ghPath={contentData.computed.ghSlug}
      >
        <WithSidebar
          sidebar={
            contentData.frontmatter.showToc ? <TOC headings={contentData.computed.toc} /> : null
          }
          direction="right"
        >
          <div className="mx-auto min-w-full">
            <div className="mx-auto max-w-[55ch] xl:mx-0 xl:max-w-full">
              <MDXRenderer source={contentData.content} />
            </div>
          </div>
        </WithSidebar>
      </DuotoneLayout>
    </Shell>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const fileSlug = (await params).slug
  const realFileSlug = `/${fileSlug.join("/")}/`
  const contentData = await getContentDataBySlug(realFileSlug)
  if (!contentData) {
    throw new Error(`Could not find metadata for ${realFileSlug}`)
  }

  return createMetadata({
    title: contentData.frontmatter.title,
    description: processMarkdownAttribute(contentData.frontmatter.description),
    slug: `${fileSlug.join("/")}/`,
  })
}
