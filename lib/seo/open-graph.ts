import type { Metadata } from "next"
import { defaultMetadata } from "@/settings"
import { remark } from "remark"
import remarkSmartypants from "remark-smartypants"

export type NextMetadata = Metadata
export type NextOpenGraph = NonNullable<NextMetadata["openGraph"]>

// NOTE: this was rewritten to match
// https://github.com/vercel/next.js/blob/canary/packages/next/src/lib/metadata/types/opengraph-types.ts over
// https://ogp.me/#types since the project uses Next.js. The framework has resolvers which rely on naming different than
// the open graph protocol as shown here
// https://github.com/vercel/next.js/blob/canary/packages/next/src/lib/metadata/resolve-metadata.ts

interface OpenGraphBase {
  title: string
  type: string
  url: string
  image?: string
  description?: string
}

interface OpenGraphWebsite extends OpenGraphBase {
  type: "website"
}

interface OpenGraphArticle extends OpenGraphBase {
  type: "article"
  publishedTime?: string // datetime
  modifiedTime?: string // datetime
  expirationTime?: string // datetime
  authors?: null | string | URL | (string | URL)[]
  section?: null | string
  tags?: null | string | string[]
}

export type OpenGraphObject = OpenGraphWebsite | OpenGraphArticle

interface CreateMetadata {
  metadataBase?: NextMetadata["metadataBase"]
  title?: NextMetadata["title"]
  description?: NextMetadata["description"]
  icons?: NextMetadata["icons"]
  twitter?: NextMetadata["twitter"]

  slug?: string

  transformOpenGraph?: (precalculatedOpenGraphObject: OpenGraphObject) => OpenGraphObject
}

export function createMetadata({
  transformOpenGraph = (ogo) => ogo,
  ...props
}: CreateMetadata): Metadata {
  const metadataBase = props.metadataBase ?? defaultMetadata.metadataBase
  const title = props.title ?? defaultMetadata.title
  const description = props.description ?? defaultMetadata.description
  const icons = props.icons ?? defaultMetadata.icons
  const twitter = props.twitter ?? defaultMetadata.twitter

  const openGraph = transformOpenGraph({
    ...defaultMetadata.openGraph,
    // this should be right
    title: title as string,
    description,
    url: metadataBase.toString() + (props.slug ?? "/"),
  })

  return {
    metadataBase,
    title,
    description,
    icons,
    openGraph,
    twitter,
  }
}

export function processMarkdownAttribute(text: string): string {
  const processed = remark()
    .use(remarkSmartypants, {
      backticks: false,
      ellipses: false,
      quotes: false,
    })
    .processSync(text)

  return processed.value.toString().trim()
}
