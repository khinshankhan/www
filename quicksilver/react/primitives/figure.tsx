import React, { type ComponentPropsWithRef, type ReactNode } from "react"

export interface FigureProps extends ComponentPropsWithRef<"figure"> {
  children: ReactNode
}

export function Figure({ children, ...props }: FigureProps) {
  return <figure {...props}>{children}</figure>
}
