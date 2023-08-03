import React, { type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Link, typographyVariants } from "@/components/ui"

export interface WithSidebarProps {
  direction?: "left" | "right"
  sidebar?: ReactNode

  before?: ReactNode
  children: ReactNode
  after?: ReactNode
}

export function WithSidebar({
  direction = "left",
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
          "flex w-full flex-col xl:justify-end xl:gap-16",
          direction === "left" ? "xl:flex-row" : "xl:flex-row-reverse"
        )}
      >
        <aside>
          {sidebar && (
            <aside className="top-6 mt-6 pt-0 sm:top-2 sm:pt-2 xl:sticky xl:min-w-[200px] xl:max-w-[200px] xl:self-start 2xl:min-w-[225px] 2xl:max-w-[225px]">
              {sidebar}
            </aside>
          )}
        </aside>
        {children}
      </div>

      {after}
    </div>
  )
}

export interface PageSkeletonLayoutProps extends WithSidebarProps {
  title: string
  subtitle: ReactNode
  path: string
  extendedSpace?: boolean
  children: ReactNode
  className?: string
}

export function PageSkeletonLayout({
  title,
  subtitle,
  direction = "right",
  sidebar,
  path: ghPath,
  extendedSpace = false,
  children,
  className = "",
  before,
  after,
}: PageSkeletonLayoutProps) {
  // the flex grow applies to the base layout's min-h flex div. this keeps any negative space between content to footer
  // (within the min-h) the content bg color, accounting for potentially shorter content
  return (
    <main className="flex grow flex-col">
      <header className={cn("bg-theme-primary pb-14 pt-14 text-center", extendedSpace && "pb-52")}>
        <h1 className={typographyVariants({ variant: "h1" })}>{title}</h1>
        <span className={typographyVariants({ variant: "main-nav", className: "block pt-6" })}>
          {subtitle}
        </span>
      </header>

      <div className="grow py-5">
        <WithSidebar direction={direction} sidebar={sidebar} before={before} after={after}>
          <article
            id="article"
            className={cn("my-6 flex min-w-full flex-1 flex-col pt-0 sm:pt-2", className)}
          >
            {children}
          </article>
        </WithSidebar>
      </div>

      <div className="bg-theme-primary py-6">
        <div className="page-container">
          <div className="flex flex-row-reverse">
            <Link href={`https://github.com/khinshankhan/anchorage/tree/main${ghPath}`}>
              View page on GitHub
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default PageSkeletonLayout
