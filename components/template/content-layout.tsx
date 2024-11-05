import React from "react"
import { Heading, Text } from "@/components/base/typography"
import { WithSidebar } from "@/components/section/with-sidebar"

export interface ContentLayoutProps {
  title: string
  subtitle: string
  children: React.ReactNode
}

export function ContentLayout({ title, subtitle, children }: ContentLayoutProps) {
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
        <WithSidebar
          direction="right"
          sidebar={<div>Sample sidebar plus some lorem ipsum to showcase wrapping</div>}
        >
          <div className="prose min-w-full">{children}</div>
        </WithSidebar>
      </div>
    </article>
  )
}
