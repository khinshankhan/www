import React, { type ReactNode } from "react"

import type { Computed } from "lib/contentlayer"

import { Toc } from "../toc"
import { Prose as Layout, type ProseProps } from "./prose"

interface ArticleProps extends ProseProps, Computed {
  toc?: boolean
  children: ReactNode
}

export const Article = ({ title, subtitle, toc = true, headings, children }: ArticleProps) => {
  return (
    <Layout
      title={title}
      subtitle={subtitle}
      sidebar={toc && <Toc headings={headings} />}
      direction="right"
    >
      {children}
    </Layout>
  )
}

export default Article
