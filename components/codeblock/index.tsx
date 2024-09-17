import React from "react"
import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar, ScrollViewport } from "@/components/primitives/scroll-area"
import { typographyVariants } from "@/components/primitives/typography"
import { CopyButton } from "./copy-to-clipboard-button"

interface CodeblockProps {
  filename?: string
  title?: string
  text?: string
  className?: string
  children?: React.ReactNode
}

export async function Codeblock({
  filename = undefined,
  title = undefined,
  text = undefined,
  className = "",
  children,
}: CodeblockProps) {
  return (
    <figure
      data-filename={filename}
      className={cn(
        typographyVariants({ variant: "small" }),
        "relative my-6 overflow-hidden rounded-lg border border-muted-foreground",
        className
      )}
    >
      <div className="flex flex-row items-center justify-between border-b border-muted-foreground bg-content/70 px-4 py-1.5">
        <div>{title && <figcaption className="mt-0">{title}</figcaption>}</div>

        <div className="flex flex-row items-center gap-2">
          {filename && (
            <div data-switcher="true">
              <noscript>(Requires Javascript to Change)</noscript>
            </div>
          )}
          <CopyButton
            className="-me-2"
            disabled={!Boolean(text)}
            text={text ?? "Something went wrong, please contact support."}
          />
        </div>
      </div>

      <ScrollArea dir="ltr" type="auto" className="bg-muted/50">
        <ScrollViewport>{children}</ScrollViewport>
        <ScrollBar orientation="horizontal" className="mx-1 mb-0.5" />
      </ScrollArea>
    </figure>
  )
}

export { CodeblockSwitcher } from "./codeblock-switcher"
