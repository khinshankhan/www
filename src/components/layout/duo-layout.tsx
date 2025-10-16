import React from "react"
import { EdgeFade } from "@/components/design-system/primitives/edge-fade"
import { Link } from "@/components/design-system/primitives/link"
import { H1, Paragraph } from "@/components/design-system/primitives/text"
import { typographyVariants } from "@/components/design-system/primitives/typography"
import { siteHeaderHeight } from "@/components/layout/app-shell/header"
import { cn } from "@/lib/utils"

interface DuoLayoutProps {
  title: string
  description: string
  ghPath?: string
  children?: React.ReactNode
}
export function DuoLayout({ title, description, ghPath, children }: DuoLayoutProps) {
  return (
    <main className="z-1 relative isolate flex grow flex-col">
      <article className="z-2 bg-background-1 relative isolate flex w-full grow flex-col items-center">
        <header
          className={cn(
            "maxw-content top-(--h) -z-1 sticky flex w-full flex-col gap-4 pb-2 pt-14",
            siteHeaderHeight
          )}
        >
          <H1 className="text-balance">{title}</H1>
          <Paragraph
            variant="nav"
            className="text-foreground-muted max-w-[75ch] leading-relaxed"
            render={(props) => {
              return <span {...props} />
            }}
          >
            {description}
          </Paragraph>
        </header>

        {/* acts as a fade effect to gradually introduce content and hide content */}
        <EdgeFade direction="top" className="z-2 relative h-12" />

        <div className="bg-background-2 z-2 relative isolate flex w-full grow flex-col items-center justify-center">
          <div className="maxw-content relative w-full grow py-14">{children}</div>
        </div>
      </article>

      {ghPath && (
        <div className="z-1 flex w-full flex-col items-center pt-14">
          <div className="maxw-page w-full text-center md:px-4 md:text-end">
            <Link
              href={`https://github.com/khinshankhan/www/tree/v52${ghPath}`}
              className={typographyVariants({ variant: "nav" })}
            >
              View page on GitHub
            </Link>
          </div>
        </div>
      )}
    </main>
  )
}
