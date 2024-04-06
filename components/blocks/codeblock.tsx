import React from "react"
import { highlight } from "sugar-high"
import { cn } from "@/lib/utils"
import { CopyToClipboardButton } from "@/components/blocks/copy-to-clipboard-button"
import { ScrollArea, ScrollBar } from "@/components/primitives/scroll-area"

export interface PreProps extends React.ComponentPropsWithoutRef<"pre"> {}
export const Pre = React.forwardRef<HTMLPreElement, PreProps>(function Pre(
  { className, children, ...props },
  forwardedRef
) {
  // @ts-ignore: it's fine, this is how mdx codeblocks work
  const text = children?.props?.children ?? "Something went wrong, please contact support."

  return (
    <div role="presentation" className="group relative flex w-full items-start justify-center">
      <ScrollArea className="group mb-0.5 block size-full rounded-lg bg-muted" type="auto">
        <CopyToClipboardButton
          text={text}
          className="absolute right-2 top-2 opacity-0 group-focus-within:opacity-100 group-hover:opacity-100"
        />
        <pre
          ref={forwardedRef}
          className="size-full whitespace-pre rounded-lg bg-muted px-4 pb-6 pt-3 text-muted-foreground [&>code]:contents"
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
