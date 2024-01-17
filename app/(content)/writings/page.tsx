import NextLink from "next/link"
import { getAllContentData } from "@/lib/content"
import { PageLayout } from "@/components/layouts/page"

export default function Page() {
  // TODO: filter out 'root' content like about, contact, etc
  const articles = getAllContentData()

  return (
    <PageLayout title="Writings" subtitle="My thoughts and ideas">
      <div className="text-center">TODO: pageo</div>

      <ul id="content" className="space-y-4">
        {articles.map((article) => (
          <li key={article.slug}>
            <NextLink
              href={`/${article.slug}/`}
              className="decoration-zinc-700 decoration-2 underline-offset-4 hover:underline"
            >
              <p>{article.frontmatter.title}</p>
              <p className="text-zinc-500">{article.frontmatter.subtitle}</p>
            </NextLink>
          </li>
        ))}
      </ul>
    </PageLayout>
  )
}
