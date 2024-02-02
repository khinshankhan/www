import React from "react"
import { cn } from "@/lib/utils"
import { typographyVariants } from "@/components/primitives/typography"

export function PageLayout({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <>
      <article id="article" className="flex grow flex-col bg-secondary-background">
        <header className="flex flex-col gap-4 bg-primary-background py-14 text-center">
          <h1 className={cn(typographyVariants({ variant: "h2" }), "text-balance")}>{title}</h1>
          <span className={cn(typographyVariants({ variant: "nav" }), "text-balance font-body")}>
            {subtitle}
          </span>
        </header>

        <section>{children}</section>
      </article>
      {/* TODO: link to github page probably */}
      <div className="mt-8 bg-primary-background pt-8">second footer</div>
    </>
  )
}
