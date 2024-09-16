import React from "react"
import { cn } from "@/lib/utils"
import { typographyVariants } from "@/components/primitives/typography"

export interface CodeProps extends React.ComponentPropsWithoutRef<"code"> {
  children: string
}

export async function Code({ className, children, ...props }: CodeProps) {
  const codeHTML = children

  return (
    <code
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: codeHTML }}
      className={cn(
        typographyVariants({ variant: "small" }),
        "rounded-lg bg-muted px-1 py-0.5 text-content-foreground",
        className
      )}
      {...props}
    />
  )
}

export interface PreProps extends React.ComponentPropsWithoutRef<"pre"> {}

export async function Pre({ children, ...props }: PreProps) {
  return (
    <pre
      className={cn(
        typographyVariants({ variant: "small" }),
        "size-full whitespace-pre rounded-lg bg-accent p-4 text-content-foreground [&>code]:contents"
      )}
      {...props}
    >
      {children}
    </pre>
  )
}
