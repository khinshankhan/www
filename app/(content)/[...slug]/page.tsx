import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getAllContentData, getContentData } from "@/lib/content"
import { PageLayout } from "@/components/layouts/page"

export async function generateStaticParams() {
  const slugsParts = getAllContentData().map((contentData) => {
    return {
      slug: contentData.slug.split("/"),
    }
  })

  return slugsParts
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const { slug } = params
  const slugPath = slug.join("/")

  // TODO: turn this to support `"**/page*.md"` when dealing with i18n
  // eg page.es.md will be spanish
  const filePath = `${slugPath}/page.md`

  const contentData = getContentData(filePath)
  if (!contentData) {
    notFound()
  }

  return (
    <PageLayout title={contentData.frontmatter.title} subtitle={contentData.frontmatter.subtitle}>
      <div id="content">
        <MDXRemote
          source={contentData.content}
          options={{
            mdxOptions: {
              remarkPlugins: [],
              rehypePlugins: [],
            },
          }}
        />
      </div>
    </PageLayout>
  )
}
