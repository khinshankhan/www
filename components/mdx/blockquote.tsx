import React, { Children } from "react"
import type { MDXComponents } from "mdx/types"
import { filter, onlyText } from "react-children-utilities"
import { Callout, isCalloutKeyword } from "@/components/callout"
import { Blockquote } from "@/components/primitives/blockquote"

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

export const MDXBlockquote: MDXComponents["blockquote"] = (props) => {
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

  const blockquoteVariant = variant ?? "blockquote"
  return (
    <Blockquote {...props} data-variant={blockquoteVariant} variant={blockquoteVariant}>
      {children}
    </Blockquote>
  )
}
