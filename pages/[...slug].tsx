import type { GetStaticProps, InferGetStaticPropsType } from "next"
import { allRootPages as pages, type RootPage } from "contentlayer/generated"
import { useLiveReload, useMDXComponent } from "next-contentlayer/hooks"

import { type Computed } from "lib/contentlayer"

import { Article } from "components/layouts"
import { MdxComponents } from "components/mdx"

export const getStaticPaths = () => {
  const paths = pages.map((p) => ({
    params: { slug: p.slug!.split(`/`) },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{
  page: RootPage
}> = async ({ params }) => {
  // unknown case
  if (!params?.slug) {
    return {
      notFound: true,
    }
  }

  const slug = !Array.isArray(params.slug) ? params.slug : params.slug.join(`/`)
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
      toc={page.toc}
      {...computed}
    >
      {MDXContent && <MDXContent components={MdxComponents} />}
    </Article>
  )
}
