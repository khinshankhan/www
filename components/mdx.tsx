import React, { Children } from "react"
import type { MDXComponents } from "mdx/types"
import { MDXRemote } from "next-mdx-remote/rsc"
import { filter, onlyText } from "react-children-utilities"
import { cn } from "@/lib/utils"
import { Callout, calloutIcons, type CalloutVariants } from "@/components/blocks/callout"
import { Blockquote } from "@/components/primitives/components"
import { Link } from "@/components/primitives/link"
import { typographyVariants } from "@/components/primitives/typography"

const mdxCalloutKeywords = Object.keys(calloutIcons).join("|").toUpperCase()
const mdxCalloutRegex = new RegExp(`\\[\\!(${mdxCalloutKeywords})\\]\\s*(.*)`)
function isMDXCallout(children: React.ReactNode[]) {
  if (!children?.length || children.length < 1) return { variant: null }

  const text = onlyText(children[0]).trim()
  const match = mdxCalloutRegex.exec(text)

  if (!match) return { variant: null }
  return {
    variant: match?.[1]?.toLowerCase() as CalloutVariants["variant"],
    heading: match?.[2] || undefined,
  }
}

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
  blockquote: (props) => {
    const children = filter(Children.toArray(props.children), (child) => typeof child !== "string")

    const { variant, heading } = isMDXCallout(children)
    if (!variant) {
      return (
        <Blockquote {...props} data-variant="quote">
          {children}
        </Blockquote>
      )
    }

    // exclude the first child for callout since it has variant/ heading info
    const trueChildren = children.slice(1)
    return (
      <Callout variant={variant} heading={heading}>
        <blockquote {...props} data-variant={variant} className="italic">
          {trueChildren}
        </blockquote>
      </Callout>
    )
  },
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
