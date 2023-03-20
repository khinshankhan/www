import React from "react"
import { allWritings as pages, type Writing } from "contentlayer/generated"

import { type Computed } from "lib/contentlayer"

import { Link } from "components/ui"
import { Prose } from "components/layouts"

function Card({ slug, computed }: Writing) {
  const { frontmatter, excerpt } = computed as Computed
  return (
    <li className="mb-8 flex flex-col flex-col-reverse rounded bg-slate-200 dark:bg-slate-800 md:flex-row md:flex-row md:flex-row">
      <div className="flex flex-1 flex-col p-4">
        <h3>
          <Link isInternal isFile={false} href={`/${slug}`} className="link-overlay">
            {frontmatter.title}
          </Link>
        </h3>
        <h4 className="text-theme-muted">{frontmatter.subtitle}</h4>
        <div dangerouslySetInnerHTML={{ __html: excerpt }} />
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
