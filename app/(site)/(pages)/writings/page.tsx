import React from "react"
import { allWritings as pages } from "contentlayer/generated"
import { type Computed } from "@/lib/contentlayer/documents"
import { Link, typographyVariants } from "@/components/ui"
import Emoji from "@/components/emoji"
import MigrationNotice from "@/components/migration-notice"

export default function Writings() {
  return (
    <>
      <MigrationNotice className="mb-4">
        <span>
          {`I'm in the process of converting my previous articles from org mode to mdx. It'll take some time, so articles won't be here for a while... soon`}{" "}
        </span>
        <Emoji name=":writing_hand:" />
      </MigrationNotice>

      <h2 className={typographyVariants({ variant: "h2" })}>Articles</h2>

      <ul className="mt-10 space-y-8">
        {pages.map((page) => {
          const computed = page.computed as Computed

          return (
            <li key={page._id} className="card-link link-box flex w-full rounded-lg bg-theme-card">
              <div className="flex h-full w-full flex-col flex-col-reverse md:flex-row">
                <div className="grow p-6">
                  <h3 className={typographyVariants({ variant: "h3" })}>
                    <Link className="link-overlay" href={`/${page.slug}`}>
                      {computed.frontmatter.title}
                    </Link>
                  </h3>
                  <span className={typographyVariants({ variant: "h4" })}>
                    {computed.frontmatter.subtitle}
                  </span>
                  <span className="line-clamp-3 text-theme-muted">{"TODO replace me"}</span>
                </div>

                <div className="relative -z-1 h-32 w-full flex-none sm:h-48 md:h-auto md:w-72 lg:w-96">
                  <img
                    // TODO: replace
                    src={computed.frontmatter.cover.img}
                    alt={computed.frontmatter.cover.alt}
                    className="md:clip-list-image relative inset-0 h-full w-full rounded-t-lg object-cover md:absolute md:rounded-r-lg"
                  />
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}
