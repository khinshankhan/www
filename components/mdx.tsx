import React, { Children } from "react"
import type { Heading } from "mdast"
import type { MDXComponents } from "mdx/types"
import { MDXRemote } from "next-mdx-remote/rsc"
import { filter, onlyText } from "react-children-utilities"
import { cn } from "@/lib/utils"
import { Callout, isCalloutKeyword } from "@/components/blocks/callout"
import { Blockquote } from "@/components/primitives/components"
import { Link } from "@/components/primitives/link"
import { typographyVariants } from "@/components/primitives/typography"

function createHeading(level: Heading["depth"]) {
  const Component = `h${level}` as const

  return function Heading({
    className = "",
    children,
    ...props
  }: React.HTMLProps<HTMLHeadingElement>) {
    // TODO: use slugify instead of temporary testing solution
    const slug = onlyText(children).toLowerCase().replace(/\s/g, "-")

    return (
      <Component
        id={slug}
        className={cn(typographyVariants({ variant: Component }), className)}
        {...props}
      >
        <Link href={`#${slug}`} nav underline={false}>
          {children}
        </Link>
      </Component>
    )
  }
}

// match blockquotes `> [!variant] heading`
const mdxBlockquoteMetaRegex = /\[!([^\]]+)\]\s*(.*)/

function getBlockquoteInfo(children: React.ReactNode[]) {
  const noMatch = { variant: undefined, heading: undefined, children }
  if (!children?.length || children.length < 1) {
    return noMatch
  }

  const text = onlyText(children[0]).trim()
  const match = mdxBlockquoteMetaRegex.exec(text)
  if (!match) {
    return noMatch
  }

  return {
    variant: match?.[1]?.toLowerCase(),
    heading: match?.[2] || undefined,
    // exclude the first child for callout since it has variant/ heading info
    children: children.slice(1),
  }
}

const baseComponents: MDXComponents = {
  a: ({ href = "#", children = null, ...props }) => (
    <Link href={href} {...props}>
      {children}
    </Link>
  ),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  blockquote: (props) => {
    // blockquote seems to interweave newlines which mess with interpretting variants
    // though the newline between the meta and actual quotation is necessary
    const givenChildren = filter(Children.toArray(props.children), (child) => child !== "\n")
    const { variant, heading, children } = getBlockquoteInfo(givenChildren)

    if (variant && isCalloutKeyword(variant)) {
      return (
        <Callout variant={variant} heading={heading}>
          <blockquote {...props} data-variant={variant} className="italic">
            {children}
          </blockquote>
        </Callout>
      )
    }

    let blockquoteVariant = variant ?? "blockquote"
    return (
      <Blockquote {...props} data-variant={blockquoteVariant} variant={blockquoteVariant}>
        {children}
      </Blockquote>
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
