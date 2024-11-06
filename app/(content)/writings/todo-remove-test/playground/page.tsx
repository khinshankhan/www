import fs from "fs"
import path from "path"
import React from "react"
import { typographyVariants } from "@/components/base/typography"
import { ContentLayout } from "@/components/template/content-layout"
import { rehypeSectionizeByHeading } from "@/lib/mdx-plugins/rehype-sectionize-by-heading"
import { rehypeSlug } from "@/lib/mdx-plugins/rehype-slug"
import { remarkMarkFirstParagraph } from "@/lib/mdx-plugins/remark-excerpt"
import { remarkPrependTopHeading } from "@/lib/mdx-plugins/remark-prepend-top-heading"
import { cn } from "@/lib/utils"
import matter from "gray-matter"
import type { MDXComponents } from "mdx/types"
import { MDXRemote } from "next-mdx-remote/rsc"

const projectRoot = process.cwd()
const thisDir = path.join(
  projectRoot,
  "app",
  "(content)",
  "writings",
  "todo-remove-test",
  "playground"
)

const components: MDXComponents = {
  // TODO: look into why heading component isn't compatible with MDX headings
  h2: ({ className = "", ...props }) => (
    <h2
      {...props}
      className={cn("scroll-mt-5", typographyVariants({ variant: "h2" }), className)}
    />
  ),
  h3: ({ className = "", ...props }) => (
    <h3
      {...props}
      className={cn("scroll-mt-5", typographyVariants({ variant: "h3" }), className)}
    />
  ),
  h4: ({ className = "", ...props }) => (
    <h4
      {...props}
      className={cn("scroll-mt-5", typographyVariants({ variant: "h4" }), className)}
    />
  ),
  h5: ({ className = "", ...props }) => (
    <h5
      {...props}
      className={cn("scroll-mt-5", typographyVariants({ variant: "h5" }), className)}
    />
  ),
  h6: ({ className = "", ...props }) => (
    <h6
      {...props}
      className={cn("scroll-mt-5", typographyVariants({ variant: "h6" }), className)}
    />
  ),

  Test: ({ className = "" }) => <div className={cn(className)}>this was a test and you passed</div>,
}

export default async function Page() {
  const absFilePath = path.join(thisDir, "./content.md")
  const fileContent = await fs.promises.readFile(absFilePath, "utf8")
  const { data, content } = matter(fileContent)

  return (
    <ContentLayout
      title={data.title}
      subtitle={data.subtitle}
      ghPath="/app/(content)/writings/todo-remove-test/playground/content.tsx"
    >
      <MDXRemote
        source={content}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [
              remarkMarkFirstParagraph,
              [
                remarkPrependTopHeading,
                {
                  depth: 2,
                  text: "Introduction",
                  properties: {
                    className: "sr-only",
                  },
                },
              ],
            ],
            rehypePlugins: [
              [
                rehypeSlug,
                {
                  reservedIds: ["excerpt"],
                },
              ],
              [
                rehypeSectionizeByHeading,
                {
                  isFlat: false,
                  sectionProperties: {
                    className: "prose",
                  },
                },
              ],
            ],
          },
        }}
      />
    </ContentLayout>
  )
}
