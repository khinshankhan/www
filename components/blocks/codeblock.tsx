import React from "react"
import { highlight } from "sugar-high"
import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "@/components/primitives/scroll-area"

export interface PreProps extends React.ComponentPropsWithoutRef<"pre"> {}
export const Pre = React.forwardRef<HTMLPreElement, PreProps>(function Pre(
  { className, children, ...props },
  forwardedRef
) {
  return (
    <div role="presentation" className="relative flex w-full items-start justify-center">
      <ScrollArea className="mb-0.5 block h-full w-full rounded-lg bg-muted" type="auto">
        <pre
          ref={forwardedRef}
          className="h-full
w-full whitespace-pre rounded-lg bg-muted px-4 pb-6 pt-3 text-muted-foreground [&>code]:contents"
          {...props}
        >
          {children}
        </pre>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
})
Pre.displayName = "CodeBlock.Pre"

export interface CodeProps extends React.ComponentPropsWithoutRef<"code"> {
  children: string
}
export const Code = React.forwardRef<HTMLElement, CodeProps>(function Code(
  { className, children, ...props },
  forwardedRef
) {
  const codeHTML = highlight(children)

  return (
    <code
      ref={forwardedRef}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: codeHTML }}
      className={cn("rounded-lg bg-muted px-1 py-0.5 text-muted-foreground", className)}
      {...props}
    />
  )
})
Code.displayName = "CodeBlock.Code"
