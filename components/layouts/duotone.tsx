import React, { type ReactNode } from "react"
import { headerHeight } from "@/lib/constants"
import { processMarkdownAttribute } from "@/lib/seo/open-graph"
import { cn } from "@/quicksilver/lib/classname"
import { EdgeFade } from "@/quicksilver/react/primitives/edge-fade"
import { Link } from "@/quicksilver/react/primitives/link"
import { H1, Span } from "@/quicksilver/react/primitives/text"
import { textVariants } from "@/quicksilver/react/primitives/text.variants"
import { mainContentTargetProps } from "./elements/skip-targets"

interface DuotoneLayoutProps {
  title: string
  description: string
  ghPath?: string
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
  ghPath,
  skipTargetInChild = false,
  children,
}: DuotoneLayoutProps) {
  const skipTargetProps = skipTargetInChild ? undefined : mainContentTargetProps
  return (
    <main
      {...skipTargetProps}
      className={cn("relative isolate z-1 flex grow flex-col", skipTargetProps?.className)}
    >
      <article className="relative isolate z-2 flex w-full grow flex-col items-center bg-background-1">
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

        <div className="relative isolate z-2 flex w-full grow flex-col items-center justify-center bg-background-2">
          <div className="relative w-full grow pt-6 pb-14 xl:pt-14">{children}</div>
        </div>
      </article>

      {ghPath && (
        <div className="z-1 flex w-full flex-col items-center pt-14">
          <div className="w-full maxw-page text-center md:px-4 md:text-end">
            <Link
              href={`https://github.com/khinshankhan/www/tree/main${ghPath}`}
              className={textVariants({ variant: "nav" })}
            >
              View page on GitHub
            </Link>
          </div>
        </div>
      )}
    </main>
  )
}
