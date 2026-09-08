import React, { type ReactNode } from "react"
import { headerHeight } from "@/lib/constants"
import { processMarkdownAttribute } from "@/lib/seo/open-graph"
import { cn } from "@/quicksilver/lib/classname"
import { EdgeFade } from "@/quicksilver/react/primitives/edge-fade"
import { H1, Span } from "@/quicksilver/react/primitives/text"
import { mainContentTargetProps } from "./elements/skip-targets"

interface DuotoneLayoutProps {
  title: string
  description: string
  /**
   * Set when a child owns the skip target instead. WithSidebar renders its sidebar DOM-first, so
   * on those pages the target has to sit past it or the skip link lands on the sidebar.
   */
  skipTargetInChild?: boolean
  children?: ReactNode
}
export function DuotoneLayout({
  title,
  description,
  skipTargetInChild = false,
  children,
}: DuotoneLayoutProps) {
  const skipTargetProps = skipTargetInChild ? undefined : mainContentTargetProps
  return (
    <main
      {...skipTargetProps}
      className={cn("relative isolate z-1 flex grow flex-col", skipTargetProps?.className)}
    >
      {/*
        The line between the article and the footer. It lives here rather than on the footer
        because the reveal clips that element with `clip-path: border-box`, which clips to the
        border box and takes the border row with it -- and an unclipped border also stays put
        instead of riding the reveal's moving edge.
      */}
      <article className="relative isolate z-2 flex w-full grow flex-col items-center border-b border-surface-5 bg-background-1">
        <header
          className={cn(
            // matches the header's own `vh-comfy:sticky`; pinning this when the header
            // is static leaves it stranded over the content it should scroll under
            "relative top-0 -z-1 flex w-full maxw-content flex-col gap-4 pt-14 pb-2 vh-comfy:sticky vh-comfy:top-(--h)",
            headerHeight
          )}
        >
          <H1 className="text-left text-pretty">{title}</H1>
          <Span
            variant="nav"
            className="text-left leading-relaxed text-pretty text-foreground-muted"
            style={{
              maxWidth: "60ch",
            }}
          >
            {
              // TODO: replace with a different processor to account for emoji
              processMarkdownAttribute(description)
            }
          </Span>
        </header>

        {/* acts as a fade effect to gradually introduce content and hide content */}
        <EdgeFade direction="top" className="relative z-2 h-12" />

        <div className="relative isolate z-2 flex w-full grow flex-col items-center justify-center border-t border-surface-5 bg-background-2">
          <div className="relative w-full grow pt-6 pb-14 xl:pt-14">{children}</div>
        </div>
      </article>
    </main>
  )
}
