import React from "react"
import NextLink from "next/link"
import {
  ScrollReveal,
  ScrollRevealBackground,
} from "@/components/design-system/patterns/view-observers/scroll-reveal"
import { Divider } from "@/components/design-system/primitives/divider"
import { EdgeFade } from "@/components/design-system/primitives/edge-fade"
import { typographyVariants } from "@/components/design-system/primitives/typography"
import { Logo } from "@/components/layout/logo"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  return (
    <ScrollRevealBackground
      fromColor="var(--color-background-1)"
      toColor="var(--color-background-2)"
      rangePx={900}
      className="z-2 sticky top-0 flex min-h-[68px] w-full flex-col items-center justify-center md:min-h-[78px] lg:min-h-[88px]"
    >
      <header className="align-center flex w-full justify-center">
        <div className="maxw-page w-full">
          <nav className="align-center flex flex-row items-center justify-between">
            {/* lhs on all views */}
            <NextLink aria-label="Navigate to homepage." href="/" className="group">
              <Logo className={cn("size-[42px] md:size-[45px] lg:size-[52px]")} />
            </NextLink>

            <div className="align-center flex flex-row gap-2">
              {[...Array(4).keys()].map((num) => {
                /* TODO: figure out navbar items */
                return (
                  <div
                    key={num}
                    className={cn(typographyVariants({ variant: "nav" }), "text-foreground-strong")}
                  >{`Link ${num}`}</div>
                )
              })}
            </div>
          </nav>
        </div>

        {/* just a really cool line effect */}
        <ScrollReveal rangePx={200}>
          <Divider className="z-2 maxw-page absolute bottom-0 left-1/2 -translate-x-1/2 transform" />
        </ScrollReveal>
      </header>

      {/* acts as buffer to gradually introduce actual header's overlay onto content */}
      <EdgeFade direction="bottom" className="z-2 absolute -bottom-16 h-16" />
    </ScrollRevealBackground>
  )
}
