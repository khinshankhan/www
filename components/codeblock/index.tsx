import React, { forwardRef } from "react"
import { highlight } from "sugar-high"
import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "@/components/primitives/scroll-area"
import { typographyVariants } from "@/components/primitives/typography"

export interface CodeProps extends React.ComponentPropsWithoutRef<"code"> {
  children: string
}

export const Code = forwardRef<HTMLElement, CodeProps>(function Code(
  { className, children, ...props },
  forwardedRef
) {
  const shouldHighlight = className?.includes("language-") ?? false
  const codeHTML = shouldHighlight ? highlight(children) : children

  return (
    <code
      ref={forwardedRef}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: codeHTML }}
      className={cn(
        !shouldHighlight && typographyVariants({ variant: "small" }),
        "rounded-lg bg-muted px-1 py-0.5 text-content-foreground",
        className
      )}
      {...props}
    />
  )
})
Code.displayName = "CodeBlock.Code"

export interface PreProps extends React.ComponentPropsWithoutRef<"pre"> {}
export const Pre = forwardRef<HTMLPreElement, PreProps>(function Pre(
  { className, children, ...props },
  forwardedRef
) {
  return (
    <div className="group relative flex w-full items-start justify-center">
      <ScrollArea
        className="group mb-0.5 block size-full rounded-lg border border-muted-foreground bg-muted"
        type="auto"
      >
        <pre
          ref={forwardedRef}
          className={cn(
            typographyVariants({ variant: "small" }),
            "size-full whitespace-pre rounded-lg bg-accent p-4 text-content-foreground [&>code]:contents"
          )}
          {...props}
        >
          {children}
        </pre>
        <ScrollBar orientation="horizontal" className="mx-1 mb-0.5" />
      </ScrollArea>
    </div>
  )
})
Pre.displayName = "CodeBlock.Pre"
