import React from "react"
import { EdgeFade } from "@/components/design-system/primitives/edge-fade"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"

function ArticleContent() {
  return (
    <main className="text-foreground z-1 relative isolate flex grow flex-col">
      <article className="z-2 relative isolate flex w-full grow flex-col items-center">
        <header className="maxw-content fixed z-0 w-full py-14">
          <h1 className="text-foreground">Title of the page</h1>
          <p className="text-foreground-muted">Description of page</p>
        </header>

        {/* TODO: determine margin based on article header height */}
        {/* acts as buffer to gradually hide fixed header, also gives header breathing room from content */}
        <EdgeFade direction="top" className="z-2 relative mt-48 h-12" />

        <div className="bg-background-2 z-2 relative isolate flex w-full grow flex-col items-center justify-center">
          <div className="maxw-content relative flex w-full grow flex-col gap-2 py-14">
            <section aria-labelledby="introduction" className="flex flex-col gap-2">
              <h2 id="introduction" className="sr-only pt-8 text-2xl font-bold">
                Introduction
              </h2>

              <p>Hello there. Content goes here [gets sourced from mdx files later].</p>
            </section>

            {[...Array(3).keys()].map((num) => (
              <section key={num} aria-labelledby={`section-${num}`} className="flex flex-col gap-2">
                <h2 id={`section-${num}`} className="text-foreground pt-8 text-2xl font-bold">
                  {`Section ${num}`}
                </h2>
                <p>
                  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
                  turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit
                  amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi
                  vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien
                  ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare
                  sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum
                  rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar
                  facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque
                  egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi,
                  tincidunt quis, accumsan porttitor, facilisis luctus, metus
                </p>
              </section>
            ))}
          </div>
        </div>
      </article>

      {/* TODO: determine margin based on content below */}
      {/* acts as buffer to gradually reveal fixed footer, also gives footer breathing room from content */}
      <EdgeFade direction="bottom" className="z-2 relative mb-56 h-12" />

      <div className="z-1 fixed bottom-44 flex w-full flex-col items-center">
        <div className="maxw-page w-full text-center md:text-end">
          [Link to specific article page goes here]
        </div>
      </div>
    </main>
  )
}

export default function Home() {
  return (
    <div className="flex min-h-screen w-full grow flex-col">
      <div className="xs:min-h-[96vh] flex min-h-[87vh] w-full grow flex-col">
        <SiteHeader />

        <ArticleContent />
      </div>

      <SiteFooter position="fixed" />
    </div>
  )
}
