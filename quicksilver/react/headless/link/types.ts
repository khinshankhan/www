import type { ComponentProps, ComponentType, ForwardRefExoticComponent, RefAttributes } from "react"

export type LinkProps = ComponentProps<"a">

export type LinkLikeComponent =
  | "a"
  | ComponentType<LinkProps>
  | ForwardRefExoticComponent<LinkProps & RefAttributes<HTMLAnchorElement>>

export type LinkKind = "hash" | "mailto" | "tel" | "external" | "internal"
