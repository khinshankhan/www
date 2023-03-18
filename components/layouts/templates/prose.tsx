import React, { type ReactNode } from "react"

import type { Computed } from "lib/contentlayer"

import { PageSkeletonLayout as Layout } from "../page-skeleton"
import { Toc } from "../toc"

interface ProseProps extends Computed {
  children: ReactNode
}

export const Prose = ({ frontmatter, headings, children }: ProseProps) => {
  const { title, subtitle } = frontmatter

  return (
    <Layout
      title={title}
      subtitle={subtitle}
      sidebar={<Toc headings={headings} />}
      direction="right"
    >
      <div id="content">{children}</div>
    </Layout>
  )
}

export default Prose
