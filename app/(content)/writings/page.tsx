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
            <a href={`/${article.slug}`}>
              <p>{article.frontmatter.title}</p>
              <p className="text-zinc-500">{article.frontmatter.subtitle}</p>
            </a>
          </li>
        ))}
      </ul>
    </PageLayout>
  )
}
