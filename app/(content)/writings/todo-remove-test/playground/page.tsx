import React from "react"
import { Toc } from "@/components/section/toc"
import { ContentLayout } from "@/components/template/content-layout"
import { MDXRenderer } from "@/components/template/mdx-renderer"
import { getContentDataBySlug } from "@/lib/content"
import { cn } from "@/lib/utils"

export default async function Page() {
  const fileSlug = ["writings", "todo-remove-test", "playground", "page.md"]
  const contentData = await getContentDataBySlug({ fileSlug })

  return (
    <ContentLayout
      title={contentData.frontmatter.title}
      subtitle={contentData.frontmatter.subtitle}
      ghPath={`/content/${fileSlug.join("/")}`}
      childrenWrappingClass={cn("prose", contentData.frontmatter.showToc && "mt-6 xl:mt-2")}
      sidebar={contentData.frontmatter.showToc && <Toc headings={contentData.computed.toc} />}
    >
      <MDXRenderer source={contentData.content} />
    </ContentLayout>
  )
}
