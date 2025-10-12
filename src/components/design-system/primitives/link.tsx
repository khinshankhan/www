import React, { Fragment } from "react"
import { useLinkContext } from "@/components/design-system/headless/link/context"
import {
  LinkKind,
  LinkLikeComponent,
  LinkProps,
} from "@/components/design-system/headless/link/types"
import {
  getSaneProps,
  isFileLite,
  resolveKindLite,
} from "@/components/design-system/headless/link/utils"
import { Download, SquareArrowOutUpRight } from "@/components/design-system/primitives/icon"
import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"
import { mergeProps } from "@base-ui-components/react/merge-props"
import { useRender } from "@base-ui-components/react/use-render"

interface LinkIconProps {
  href: string
  kind?: LinkKind
}
export const LinkIcon = ({ href, kind = undefined }: LinkIconProps) => {
  const isExternal = kind ? kind === "external" : resolveKindLite(href) === "external"
  if (isExternal) {
    return <SquareArrowOutUpRight aria-label="External link." className="inline size-3 align-top" />
  }

  const isFile = isFileLite(href)
  if (isFile) {
    return <Download aria-label="File link." className="inline size-3 align-middle" />
  }

  return null
}

export const linkVariants = cva("transition-[color] duration-500", {
  variants: {
    variant: {
      default:
        "bg-linear-to-r from-accent-11 to-accent-11 subtle-underline show-underline hover:from-accent-8 hover:to-accent-8 hover:drastic-underline bg-no-repeat",
      nav: "bg-linear-to-r from-accent-11 to-accent-11 link-hide hover:link-show data-[active=true]:link-show bg-right-bottom bg-no-repeat transition-[color,background-size] hover:bg-left-bottom data-[active=true]:bg-left-bottom",
      toc: "data-[active=true]:text-accent-11",
      none: "",
    },
    isMonochrome: {
      false: "hover:text-accent-11",
      true: "",
    },
  },
  defaultVariants: {
    variant: "default",
    isMonochrome: false,
  },
})

export type LinkVariants = VariantProps<typeof linkVariants>

interface LinkComponentProps extends useRender.ComponentProps<"a">, LinkProps, LinkVariants {
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
  icon?: React.ReactNode
  children?: React.ReactNode
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
  const { HashComponent, ExternalComponent, InternalComponent, MailtoComponent, TelComponent } =
    useLinkContext()

  const components: Record<LinkKind, LinkLikeComponent> = {
    mailto: MailtoComponent,
    tel: TelComponent,
    hash: HashComponent,
    internal: InternalComponent,
    external: ExternalComponent,
  } as const

  const kind: LinkKind = resolveKindLite(href)
  const Comp = components[kind]

  const saneProps = getSaneProps(kind)

  return useRender({
    defaultTagName: "a",
    render: render ?? ((props) => <Comp {...props} />),
    props: mergeProps<"a">(
      {
        href,
        className: cn(linkVariants({ variant, isMonochrome }), className),
        ...saneProps,
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
