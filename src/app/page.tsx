import React from "react"
import { RevealOnScroll } from "@/components/reveal-on-scroll"
import { cn } from "@/lib/utils"

interface HorizontalLineProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient?: string
  bg?: string
  className?: string
  children?: React.ReactNode
}

function HorizontalLine({
  gradient = "bg-gradient-to-r from-foreground/0 via-foreground/40 to-foreground/0",
  bg = "bg-background-1",
  className = "",
  children,
  ...props
}: HorizontalLineProps) {
  return (
    <div role="separator" className={cn("relative w-full", className)} {...props}>
      <div role="presentation" className={cn("bg-foreground relative h-px w-full", gradient)} />

      {children && (
        <div className={cn("absolute -bottom-3 w-full text-center")}>
          <span className={cn("px-2", bg)}>{children}</span>
        </div>
      )}
    </div>
  )
}

export default function Home() {
  return (
    <div className="flex min-h-screen w-full grow flex-col">
      <div className="xs:min-h-[96vh] flex min-h-[87vh] w-full grow flex-col">
        <div className="z-2 bg-background-1 sticky top-0 w-full">
          <header className="align-center flex w-full justify-center py-4 pt-8">
            <div className="page-layout w-full">
              <nav className="align-center flex flex-row justify-between">
                <div>icon</div>

                <div className="align-center flex flex-row gap-2">
                  {[...Array(4).keys()].map((num) => (
                    <div key={num}>{`Link ${num}`}</div>
                  ))}
                </div>
              </nav>
            </div>

            {/* just a really cool line effect */}
            <RevealOnScroll rangePx={200}>
              <HorizontalLine className="z-2 page-layout absolute bottom-0 left-1/2 -translate-x-1/2 transform" />
            </RevealOnScroll>
          </header>

          {/* acts as buffer to gradually introduce actual header's overlay onto content */}
          <div className="from-background-1/100 via-background-1/50 to-background-1/0 absolute -bottom-16 h-16 w-full bg-gradient-to-b" />
        </div>

        <div className="isolate flex w-full flex-col items-center">
          <header className="content-layout fixed z-0 w-full py-14">
            <h1>Title of the page</h1>
            <span>Description of page</span>

            <HorizontalLine className="z-0 mt-10">
              93ecdd28051c2a5053f29c7888cf45e8b7ab2b86
            </HorizontalLine>
          </header>
        </div>

        {/* acts as buffer to gradually hide fixed header, also gives header breathing room from content */}
        <div className="z-1 from-background-1/100 via-background-1/50 to-background-1/0 relative mt-48 h-12 bg-gradient-to-t" />

        <div className="bg-background-2 isolate flex w-full grow flex-col items-center justify-center">
          <div className="content-layout relative flex w-full grow flex-col gap-2 py-14">
            <p>Hello there. Content goes here</p>

            {[...Array(13).keys()].map((num) => (
              <p key={num}>
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
                egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet,
                ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.
                Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.
                Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean
                fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus
                lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent
                dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna
                eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor,
                facilisis luctus, metus
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-background-1 w-full">footer</div>
    </div>
  )
}
