import React from "react"
import { cn } from "@/lib/utils"
import { Divider } from "@/components/primitives/divider"

export interface WithSidebarProps {
  direction?: "left" | "right"
  sidebar?: React.ReactNode

  before?: React.ReactNode
  children: React.ReactNode
  after?: React.ReactNode
}

export function WithSidebar({
  direction = "right",
  sidebar,
  before,
  children,
  after,
}: WithSidebarProps) {
  return (
    <div className="content-container flex flex-col gap-10">
      {before}

      <div
        className={cn(
          sidebar && "content-container-with-sidebar",
          "flex w-full flex-col xl:justify-end xl:gap-16",
          direction === "left" ? "xl:flex-row" : "xl:flex-row-reverse"
        )}
      >
        {sidebar && (
          <aside className="xl:sticky xl:top-2 xl:mt-2 xl:min-w-[200px] xl:max-w-[200px] xl:self-start xl:pt-24 2xl:min-w-[225px] 2xl:max-w-[225px]">
            {sidebar}
          </aside>
        )}
        {children}
      </div>

      {after}
    </div>
  )
}

export interface ContentLayoutProps extends WithSidebarProps {
  title: string
  subtitle: React.ReactNode
  children: React.ReactNode
}

export function ContentLayout({
  title,
  subtitle,
  children,
  direction = "right",
  sidebar = null,
  before = null,
  after = null,
}: ContentLayoutProps) {
  // the flex grow applies to the base layout's min-h flex div. this keeps any negative space between content to footer
  // (within the min-h) the content bg color, accounting for potentially shorter content
  return (
    <main className="flex grow flex-col">
      <header className="bg-background py-14 text-center text-foreground">
        <h1 className="text-balance">{title}</h1>
        <span className="block text-balance pt-6 font-medium text-muted-foreground">
          {subtitle}
        </span>
      </header>

      <Divider width="w-full md:w-[80%]" />

      <div className="grow bg-content py-5 text-content-foreground">
        <WithSidebar direction={direction} sidebar={sidebar} before={before} after={after}>
          <article className="my-6 flex min-w-full flex-1 flex-col pt-0 sm:pt-2">
            {children}
          </article>
        </WithSidebar>
      </div>

      <div className="bg-background py-6 text-foreground">
        <div className="page-container">
          <div className="flex flex-row-reverse">
            <p>View page on GitHub</p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ContentLayout
