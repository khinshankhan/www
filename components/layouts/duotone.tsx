"use client"

import React, { type ReactNode } from "react"
import { processMarkdownAttribute } from "@/lib/seo/open-graph"
import { cn } from "@/quicksilver/lib/classname"
import { EdgeFade } from "@/quicksilver/react/primitives/edge-fade"
import { Link } from "@/quicksilver/react/primitives/link"
import { H1, Paragraph } from "@/quicksilver/react/primitives/text"
import { textVariants } from "@/quicksilver/react/primitives/text.variants"
import { headerHeight } from "./elements/header"

interface DuotoneLayoutProps {
  title: string
  description: string
  ghPath?: string
  children?: ReactNode
}
export function DuotoneLayout({ title, description, ghPath, children }: DuotoneLayoutProps) {
  return (
    <main className="relative isolate z-1 flex grow flex-col">
      <article className="relative isolate z-2 flex w-full grow flex-col items-center bg-background-1">
        <header
          className={cn(
            "sticky top-(--h) -z-1 flex w-full maxw-content flex-col gap-4 pt-14 pb-2",
            headerHeight
          )}
        >
          <H1 className="text-center text-balance xl:text-left">{title}</H1>
          <Paragraph
            variant="nav"
            className="max-w-[75ch] text-center leading-relaxed text-foreground-muted xl:text-left"
            render={(props) => {
              return (
                <span {...props}>
                  {
                    // TODO: replace with a different processor to account for emoji
                    processMarkdownAttribute(description)
                  }
                </span>
              )
            }}
          />
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
