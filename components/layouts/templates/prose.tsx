import React from "react"
import { PageSkeletonLayout as Layout, type PageSkeletonLayoutProps } from "../page-skeleton"

// TODO: add seo
export type ProseProps = PageSkeletonLayoutProps

export const Prose = ({ children, ...props }: ProseProps) => {
  return (
    <Layout {...props}>
      <div id="content" tabIndex={-1}>
        {children}
      </div>
    </Layout>
  )
}

export default Prose
