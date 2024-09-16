import React from "react"
import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar, ScrollViewport } from "@/components/primitives/scroll-area"
import { typographyVariants } from "@/components/primitives/typography"
import { CopyButton } from "./copy-to-clipboard-button"

interface CodeblockProps {
  title?: string
  text?: string
  className?: string
  children?: React.ReactNode
}

export async function Codeblock({
  title = undefined,
  text = undefined,
  className = "",
  children,
}: CodeblockProps) {
  return (
    <figure
      className={cn(
        typographyVariants({ variant: "small" }),
        "relative my-6 overflow-hidden rounded-lg border border-muted-foreground",
        className
      )}
    >
      <div className="flex flex-row items-center justify-between border-b border-muted-foreground bg-content/70 px-4 py-1.5">
        <div>{title && <figcaption className="mt-0">{title}</figcaption>}</div>
        <CopyButton
          className="-me-2"
          disabled={!Boolean(text)}
          text={text ?? "Something went wrong, please contact support."}
        />
      </div>

      <ScrollArea dir="ltr" type="auto" className="bg-muted/50">
        <ScrollViewport>{children}</ScrollViewport>
        <ScrollBar orientation="horizontal" className="mx-1 mb-0.5" />
      </ScrollArea>
    </figure>
  )
}
