import type { GetStaticProps, InferGetStaticPropsType } from "next"
import { allWritings as pages, type Writing } from "contentlayer/generated"
import { useLiveReload, useMDXComponent } from "next-contentlayer/hooks"

import type { Computed } from "lib/contentlayer"

import { Article } from "components/layouts"
import { MdxComponents } from "components/mdx"

const prefix = `writings`

export const getStaticPaths = () => {
  const paths = pages.map((p) => ({
    // NOTE: remove first part of path since next will add it in based on location in pages
    params: { slug: p.slug!.split(`/`).slice(1) },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{
  page: Writing
}> = async ({ params }) => {
  // unknown case
  if (!params?.slug) {
    return {
      notFound: true,
    }
  }

  let slug = !Array.isArray(params.slug) ? params.slug : params.slug.join(`/`)
  // add back prefix to match slug
  slug = `${prefix}/${slug}`
  const page = pages.find((doc) => doc!.slug === slug)

  if (!page) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      page,
    },
  }
}

export default function PageView({ page }: InferGetStaticPropsType<typeof getStaticProps>) {
  useLiveReload()
  const MDXContent = useMDXComponent(page?.body?.code || "")

  const computed = page.computed as Computed
  const MDXSubtitle = useMDXComponent(computed.mdx.subtitle || "")

  return (
    <Article
      title={computed.frontmatter.title}
      subtitle={MDXSubtitle && <MDXSubtitle components={MdxComponents} />}
      {...computed}
    >
      {MDXContent && <MDXContent components={MdxComponents} />}
    </Article>
  )
}
