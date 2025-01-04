import React from "react"
import { ContentPattern } from "@/components/base/patterns"
import { Heading, Text } from "@/components/base/typography"
import { SmartLink } from "@/components/composite/smart-link"
import { WithSidebar, type WithSidebarProps } from "@/components/section/with-sidebar"
import { processMarkdown } from "@/lib/content"
import { cn } from "@/lib/utils"

export interface ContentLayoutProps extends WithSidebarProps {
  title: string
  description: string
  ghPath: string
  children: React.ReactNode
  childrenWrappingClass?: string
  hideContentPattern?: boolean
}

export function ContentLayout({
  title,
  description,
  ghPath,
  children,
  childrenWrappingClass = "prose",
  direction = "right",
  sidebar = null,
  hideContentPattern = false,
}: ContentLayoutProps) {
  return (
    <article className="relative isolate flex grow flex-col">
      <header className="bg-background-1 py-14">
        <div className="bounded-content-layout">
          <Heading id="page-heading" as="h1" variant="h1" className="text-balance">
            {title}
          </Heading>

          <Text as="p" variant="nav" className="pt-6 text-balance text-muted-foreground">
            {processMarkdown(description).excerpt}
          </Text>
        </div>
      </header>

      <div id="page-content" className="bounded-content-layout my-1 flex grow flex-col py-12">
        <WithSidebar direction={direction} sidebar={sidebar}>
          <div className={cn("min-w-full", childrenWrappingClass)}>{children}</div>
        </WithSidebar>

        {!hideContentPattern && <ContentPattern />}
      </div>

      <div className="bg-background-1 py-6 text-center">
        <div className="bounded-page-layout flex flex-row-reverse">
          <SmartLink href={`https://github.com/khinshankhan/www/tree/main${ghPath}`}>
            View page on GitHub
          </SmartLink>
        </div>
      </div>
    </article>
  )
}
