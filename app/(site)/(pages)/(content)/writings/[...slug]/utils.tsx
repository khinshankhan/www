import { allWritings as pages } from "contentlayer/generated"

const prefix = "writings"

export interface PageProps {
  params: {
    slug: string[]
  }
}

export async function generateStaticParams(): Promise<PageProps["params"][]> {
  return pages.map((page) => ({
    // NOTE: remove first part of path since next will add it in based on location in pages
    slug: page.slug.split("/").slice(1),
  }))
}

export async function getPageFromParams(params: PageProps["params"]) {
  let slug = !Array.isArray(params.slug) ? params.slug : params.slug.join(`/`)
  // add back prefix to match slug
  slug = `${prefix}/${slug}`
  const page = pages.find((doc) => doc.slug === slug)

  if (!page) {
    null
  }

  return page
}
