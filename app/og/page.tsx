import React from "react"
import { Comic_Neue } from "next/font/google"
import { cn } from "@/lib/utils"
import { HomeLink } from "@/components/layouts/base/links"
import { HeroPattern } from "@/components/patterns"
import { typographyVariants } from "@/components/primitives/typography"

const fonto = Comic_Neue({
  subsets: ["latin"],
  variable: "--font-test",
  display: "swap",
  weight: ["300", "400", "700"],
})

export default function Og() {
  return (
    <main
      id="content"
      className={typographyVariants({
        variant: "default",
        className: cn("isolate z-0 h-full w-full", fonto.variable),
      })}
    >
      <div className="flex h-full w-full flex-row">
        <div className="w-[375px]">
          <div className="grid-cols grid h-full w-full content-center">
            <div className="flex w-full flex-row justify-center">
              <HomeLink sizes="size-[215px]" />
            </div>
          </div>
        </div>

        <div
          className="h-full w-[750px]"
          style={{
            // TODO: circle back to this
            // textShadow: "hsl(var(--knockout-foreground)) 1px 0 0px, hsl(var(--knockout)) 2px 0 0px",
            backgroundImage: `radial-gradient(circle at 6px 24px, #404458 1%, transparent 1%), radial-gradient(circle at 47px 53px, #3f4356 1%, transparent 1%)`,
            backgroundSize: "79px 60px",
          }}
        >
          <div className="grid-cols grid h-full w-full content-center">
            <div className="flex w-full flex-row justify-center">
              <div className="flex flex-col text-center">
                <h1
                  className={typographyVariants({ variant: "h1", className: "!text-7xl" })}
                  style={{
                    fontFamily: "var(--font-test)",
                  }}
                >
                  <span className="p-12">Khinshan Khan</span>
                </h1>

                <h2
                  className={typographyVariants({
                    variant: "h2",
                    className: cn(
                      "mx-auto mt-6 max-w-[700px] hyphens-auto text-balance !text-4xl font-normal text-muted-foreground sm:hyphens-none"
                    ),
                  })}
                  style={{
                    fontFamily: "var(--font-test)",
                  }}
                >
                  <span className="p-12">
                    Exploring the <span style={{ color: "var(--syntax-4)" }}>intersections</span> of{" "}
                    <span style={{ color: "var(--syntax-5)" }}>creativity</span> and{" "}
                    <span style={{ color: "var(--syntax-3)" }}>technology</span>{" "}
                  </span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
