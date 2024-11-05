import React from "react"
import { Heading, Text } from "@/components/base/typography"

export interface PageHeaderProps {
  title: string
  subtitle: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
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
  )
}
