import React from "react"
import {
  ScrollReveal,
  ScrollRevealBackground,
} from "@/components/design-system/patterns/view-observers/scroll-reveal"
import { Divider } from "@/components/design-system/primitives/divider"
import { EdgeFade } from "@/components/design-system/primitives/edge-fade"
import { typographyVariants } from "@/components/design-system/primitives/text"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  return (
    <div className="z-2 sticky top-0 w-full">
      <ScrollRevealBackground
        fromColor="var(--color-background-1)"
        toColor="var(--color-background-2)"
        rangePx={842}
      >
        <header className="align-center flex w-full justify-center py-4 pt-8">
          <div className="maxw-page w-full">
            <nav className="align-center flex flex-row justify-between">
              {/* TODO: port over logo */}
              <div className={cn(typographyVariants({ variant: "nav" }), "text-foreground-strong")}>
                icon
              </div>

              <div className="align-center flex flex-row gap-2">
                {[...Array(4).keys()].map((num) => {
                  /* TODO: figure out navbar items */
                  return (
                    <div
                      key={num}
                      className={cn(
                        typographyVariants({ variant: "nav" }),
                        "text-foreground-strong"
                      )}
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
    </div>
  )
}
