import React from "react"

import { PageSkeletonLayout as Layout, type PageSkeletonLayoutProps } from "../page-skeleton"

// TODO: add seo
interface ProseProps extends PageSkeletonLayoutProps {}

export const Prose = ({ children, ...props }: ProseProps) => {
  return (
    <Layout {...props}>
      <div id="content">{children}</div>
    </Layout>
  )
}

export default Prose
