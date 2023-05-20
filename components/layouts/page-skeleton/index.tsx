import React, { type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Link, typographyVariants } from "@/components/ui"

export interface WithSidebarProps {
  direction?: "left" | "right"
  sidebar?: ReactNode
  children: ReactNode
}

export function WithSidebar({ direction = "left", sidebar, children }: WithSidebarProps) {
  return (
    <div
      className={cn(
        "page-container flex-col gap-20 xl:flex",
        direction === "left" ? "xl:flex-row xl:justify-start" : "xl:flex-row-reverse xl:justify-end"
      )}
    >
      {sidebar && (
        <aside className="top-6 mt-6 pt-0 sm:top-2 sm:pt-2 xl:sticky xl:min-w-[225px] xl:max-w-[225px] xl:self-start 2xl:min-w-[275px] 2xl:max-w-[275px]">
          {sidebar}
        </aside>
      )}
      {children}
    </div>
  )
}

export interface PageSkeletonLayoutProps extends WithSidebarProps {
  title: string
  subtitle: ReactNode
  path: string
  children: ReactNode
}

export function PageSkeletonLayout({
  title,
  subtitle,
  direction = "left",
  sidebar,
  path: ghPath,
  children,
}: PageSkeletonLayoutProps) {
  // the flex grow applies to the base layout's min-h flex div. this keeps any negative space between content to footer
  // (within the min-h) the content bg color, accounting for potentially shorter content
  return (
    <main className="flex grow flex-col">
      <header className="bg-theme-primary py-14 text-center">
        <h1 className={typographyVariants({ variant: "h1" })}>{title}</h1>
        <span className={typographyVariants({ variant: "main-nav", className: "block pt-6" })}>
          {subtitle}
        </span>
      </header>

      <div className="grow py-5">
        <WithSidebar direction={direction} sidebar={sidebar}>
          <article id="article" className="mt-6 grow pt-0 sm:pt-2">
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
