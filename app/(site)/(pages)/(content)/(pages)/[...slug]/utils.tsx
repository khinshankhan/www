import { allPages as pages } from "contentlayer/generated"

export interface PageProps {
  params: {
    slug: string[]
  }
}

export async function generateStaticParams(): Promise<PageProps["params"][]> {
  return pages.map((page) => ({
    slug: page.slug.split("/"),
  }))
}

export async function getPageFromParams(params: PageProps["params"]) {
  const slug = !Array.isArray(params.slug) ? params.slug : params.slug.join(`/`)
  const page = pages.find((doc) => doc.slug === slug)

  if (!page) {
    null
  }

  return page
}
