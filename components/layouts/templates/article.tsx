import React, { type ReactNode } from "react"

import type { Computed } from "lib/contentlayer"

import { Toc } from "../toc"
import { Prose as Layout } from "./prose"

interface ArticleProps extends Computed {
  children: ReactNode
}

export const Article = ({ frontmatter, headings, children }: ArticleProps) => {
  const { title, subtitle } = frontmatter

  return (
    <Layout
      title={title}
      subtitle={subtitle}
      sidebar={<Toc headings={headings} />}
      direction="right"
    >
      {children}
    </Layout>
  )
}

export default Article
