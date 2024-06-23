import React from "react"
import type { MDXComponents } from "mdx/types"
import { MDXRemote } from "next-mdx-remote/rsc"
import { cn } from "@/lib/utils"
import { Link } from "@/components/primitives/link"
import { typographyVariants } from "@/components/primitives/typography"

const baseComponents: MDXComponents = {
  a: ({ href = "#", children = null, ...props }) => (
    <Link href={href} {...props}>
      {children}
    </Link>
  ),
  h3: ({ className = "", ...props }) => (
    <h3 {...props} className={cn(typographyVariants({ variant: "h3", className }))} />
  ),
  h4: ({ className = "", ...props }) => (
    <h4 {...props} className={cn(typographyVariants({ variant: "h4", className }))} />
  ),
  h5: ({ className = "", ...props }) => (
    <h5 {...props} className={cn(typographyVariants({ variant: "h5", className }))} />
  ),
  h6: ({ className = "", ...props }) => (
    <h6 {...props} className={cn(typographyVariants({ variant: "h6", className }))} />
  ),
}

export function MDXContent({
  source,
  components = {},
}: {
  source: string
  components?: MDXComponents
}) {
  const allComponents = { ...baseComponents, ...components }

  return (
    <MDXRemote
      source={source}
      components={allComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [],
        },
      }}
    />
  )
}
