import React from "react"

export type LinkProps = React.ComponentProps<"a">

export type LinkLikeComponent =
  | "a"
  | React.ComponentType<LinkProps>
  | React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>
