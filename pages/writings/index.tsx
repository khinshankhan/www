import React from "react"
import { allWritings as pages, type Writing } from "contentlayer/generated"
import { useMDXComponent } from "next-contentlayer/hooks"

import { type Computed } from "lib/contentlayer"

import { Link } from "components/ui"
import { Prose } from "components/layouts"
import { MdxComponents } from "components/mdx"

function Card({ slug, computed }: Writing) {
  const { frontmatter, mdx } = computed as Computed
  const MDXSubtitle = useMDXComponent(mdx.subtitle || "")
  const MDXExcerpt = useMDXComponent(mdx.excerpt || "")

  return (
    <li className="mb-8 flex flex-col flex-col-reverse rounded bg-slate-200 dark:bg-slate-800 md:flex-row md:flex-row md:flex-row">
      <div className="flex flex-1 flex-col p-4">
        <h3>
          <Link isInternal isFile={false} href={`/${slug}`} className="link-overlay">
            {frontmatter.title}
          </Link>
        </h3>
        <h4 className="text-theme-muted">
          {MDXSubtitle && <MDXSubtitle components={MdxComponents} />}
        </h4>
        <div>{MDXExcerpt && <MDXExcerpt components={MdxComponents} />}</div>
      </div>
      <div>img</div>
    </li>
  )
}

function List({ pages }: { pages: Writing[] }) {
  return (
    <ul>
      {pages.map((page) => (
        <Card key={page._id} {...page} />
      ))}
    </ul>
  )
}

export default function Page() {
  return (
    <Prose title="Writings" subtitle="Rambling and stuff">
      <List pages={pages} />
    </Prose>
  )
}
