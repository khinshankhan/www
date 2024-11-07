import React from "react"
import { Heading, Text } from "@/components/base/typography"
import { SmartLink } from "@/components/composite/smart-link"
import { WithSidebar, type WithSidebarProps } from "@/components/section/with-sidebar"
import { cn } from "@/lib/utils"

export interface ContentLayoutProps extends WithSidebarProps {
  title: string
  subtitle: string
  ghPath: string
  children: React.ReactNode
  childrenWrappingClass?: string
}

export function ContentLayout({
  title,
  subtitle,
  ghPath,
  children,
  childrenWrappingClass = "prose",
  direction = "right",
  sidebar = null,
}: ContentLayoutProps) {
  return (
    <article className="flex grow flex-col">
      <header className="bg-background-1 py-14 text-center">
        <div className="bounded-page-layout">
          <Heading id="page-heading" as="h1" variant="h1" className="text-balance">
            {title}
          </Heading>

          <Text as="p" variant="nav" className="text-balance pt-6 text-muted-foreground">
            {subtitle}
          </Text>
        </div>
      </header>

      <div className="bounded-content-layout my-1 flex grow flex-col py-12">
        <WithSidebar direction={direction} sidebar={sidebar}>
          <div className={cn("min-w-full", childrenWrappingClass)}>{children}</div>
        </WithSidebar>
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
