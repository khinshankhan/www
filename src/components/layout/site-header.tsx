import React from "react"
import {
  ScrollReveal,
  ScrollRevealBackground,
} from "@/components/design-system/patterns/view-observers/scroll-reveal"
import { Divider } from "@/components/design-system/primitives/divider"
import { EdgeFade } from "@/components/design-system/primitives/edge-fade"

export function SiteHeader() {
  return (
    <div className="z-2 sticky top-0 w-full">
      <ScrollRevealBackground
        fromColor="var(--background-1)"
        toColor="var(--background-2)"
        rangePx={1440}
      >
        <header className="align-center flex w-full justify-center py-4 pt-8">
          <div className="maxw-page w-full">
            <nav className="align-center flex flex-row justify-between">
              {/* TODO: port over logo */}
              <div>icon</div>

              <div className="align-center flex flex-row gap-2">
                {[...Array(4).keys()].map((num) => {
                  /* TODO: figure out navbar items */
                  return <div key={num}>{`Link ${num}`}</div>
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
