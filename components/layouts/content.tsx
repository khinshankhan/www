import React from "react"
import { cn } from "@/lib/utils"
import { Link } from "@/components/primitives/link"
import { typographyVariants } from "@/components/primitives/typography"

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
          <aside className="z-sticky xl:sticky xl:top-2 xl:mt-6 xl:min-w-[250px] xl:max-w-[250px] xl:self-start xl:pt-2 2xl:min-w-[275px] 2xl:max-w-[275px]">
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
  ghPath: string
  children: React.ReactNode
}

export function ContentLayout({
  title,
  subtitle,
  children,
  direction = "right",
  ghPath,
  sidebar = null,
  before = null,
  after = null,
}: ContentLayoutProps) {
  // the flex grow applies to the base layout's min-h flex div. this keeps any negative space between content to footer
  // (within the min-h) the content bg color, accounting for potentially shorter content
  return (
    <main className="flex grow flex-col bg-background text-foreground">
      <header className="py-14 text-center">
        <h1 className={cn(typographyVariants({ variant: "h1" }), "text-balance")}>{title}</h1>
        <h2
          className={cn(
            typographyVariants({ variant: "nav" }),
            "block text-balance pt-6 font-medium text-muted-foreground"
          )}
        >
          {subtitle}
        </h2>
      </header>

      <div className="isolate grow bg-content py-5 text-content-foreground">
        <WithSidebar direction={direction} sidebar={sidebar} before={before} after={after}>
          <article className="my-6 flex min-w-full flex-1 flex-col pt-0 sm:pt-2">
            {children}
          </article>
        </WithSidebar>
      </div>

      <div className="z-1 bg-background py-6 text-foreground">
        <div className="page-container">
          <div className="flex flex-row-reverse">
            <Link href={`https://github.com/khinshankhan/www/tree/main${ghPath}`}>
              View page on GitHub
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ContentLayout
