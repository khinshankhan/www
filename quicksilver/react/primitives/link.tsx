"use client"

import React, { Fragment, type ReactNode } from "react"
import { cn } from "@/quicksilver/lib/classname"
import { useLinkContext } from "@/quicksilver/react/headless/link/context"
import type { LinkKind, LinkProps } from "@/quicksilver/react/headless/link/types"
import { getSaneProps, isFileLite, resolveKindLite } from "@/quicksilver/react/headless/link/utils"
import { mergeProps } from "@base-ui-components/react/merge-props"
import { useRender } from "@base-ui-components/react/use-render"
import { Download, SquareArrowOutUpRight } from "./icons"
import { linkVariants, type LinkVariants } from "./link.variants"

interface LinkIconProps {
  href: string
  kind?: LinkKind
}
export const LinkIcon = ({ href, kind = undefined }: LinkIconProps) => {
  const isExternal = kind ? kind === "external" : resolveKindLite(href) === "external"
  if (isExternal) {
    return (
      <SquareArrowOutUpRight aria-label="External link." className="mb-0 inline size-3 align-top" />
    )
  }

  const isFile = isFileLite(href)
  if (isFile) {
    return <Download aria-label="File link." className="mb-0 inline size-3 align-middle" />
  }

  return null
}

interface LinkComponentState {
  kind: LinkKind
}

interface LinkComponentProps
  extends useRender.ComponentProps<"a", LinkComponentState>,
    LinkProps,
    LinkVariants {
  className?: string
  /**
   * Trailing icon/adornment behavior.
   *
   * - `undefined` (default): A contextual icon is **auto-selected** based on `href`/`kind`
   * - `null`: **No icon** is rendered at all (opt-out).
   * - `ReactNode`: The provided icon is rendered **as-is** (opt-in to a custom icon).
   *
   * When using a custom `render` function and you want full control of icon placement,
   * pass `icon={null}` and render your own icon inside `render` (or `children`).
   */
  icon?: ReactNode
  children?: ReactNode
}

export function LinkComponent({
  // NOTE: although href is optional official spec, Link without href is not very useful. We will treat it as it as
  // homepage link for safety, but we'll use linters and and validators to ensure href is always provided when consumed
  // from data sources.
  href = "/",
  className = "",
  variant = "default",
  isMonochrome = false,
  icon = undefined,
  children = null,
  render = undefined,
  ...props
}: LinkComponentProps) {
  const kind: LinkKind = resolveKindLite(href)

  return useRender({
    defaultTagName: "a",
    render: render ?? ((props) => <ResolvedLinkComponent kind={kind} {...props} />),
    state: { kind },
    props: mergeProps<"a">(
      {
        href,
        className: cn(linkVariants({ variant, isMonochrome }), className),
        ...getSaneProps(kind),
        ...props,
        children: (
          <Fragment>
            {children}
            {icon === undefined ? <LinkIcon href={href} kind={kind} /> : icon}
          </Fragment>
        ),
      },
      props
    ),
  })
}

export const Link = LinkComponent

interface ResolvedLinkComponentProps extends LinkComponentProps {
  kind: LinkKind
}
export function ResolvedLinkComponent({ kind, ...props }: ResolvedLinkComponentProps) {
  const { HashComponent, ExternalComponent, InternalComponent, MailtoComponent, TelComponent } =
    useLinkContext()

  const actualKind = kind
  switch (kind) {
    case "mailto": {
      return <MailtoComponent {...props} />
    }
    case "tel": {
      return <TelComponent {...props} />
    }
    case "hash": {
      return <HashComponent {...props} />
    }
    case "internal": {
      return <InternalComponent {...props} />
    }
    case "external": {
      return <ExternalComponent {...props} />
    }
    default: {
      const _exhaustiveCheck: never = kind
      void _exhaustiveCheck

      throw new Error(`Unhandled link kind: ${actualKind}`)
    }
  }
}
