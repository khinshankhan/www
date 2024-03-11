import React from "react"
import { ContentData } from "@/schemas/content"
import { getContentDataBySource } from "@/lib/content"
import { cn } from "@/lib/utils"
import { Callout } from "@/components/blocks/callout"
import { Link } from "@/components/primitives/link"
import { typographyVariants } from "@/components/primitives/typography"

function WritingCard({ content }: { content: ContentData }) {
  return (
    <li
      key={content.slug}
      className="card-link link-box flex w-full flex-row rounded-lg bg-card p-4 text-card-foreground shadow-lg"
    >
      <img
        alt=""
        src="https://hb.imgix.net/41ff19a5a115ce7c78207f166f069b3ab69ed00f.jpg?auto=compress,format&fit=crop&h=600&w=1200&s=bac8a397bb20bed183ded6fdb5b7ebb1"
        className="h-[9.375rem]"
      />
      <div className="ml-4 flex flex-grow flex-col justify-between">
        <h3 className={typographyVariants({ variant: "h3" })}>
          <Link href={`/${content.slug}`} className="link-overlay" nav={true} underline={false}>
            {content.frontmatter.title}
          </Link>
        </h3>
        <p className={typographyVariants({ variant: "h4" })}>{content.frontmatter.subtitle}</p>
        <p className="line-clamp-3">{content.frontmatter.description}</p>
      </div>
    </li>
  )
}

export default function Writings() {
  const allContentData = getContentDataBySource("writings")

  return (
    <main className="space-y-4">
      <Callout variant="note" heading="Work in Progress">
        <p>
          {"I'm"} in the process of converting my previous articles from org mode and loose messages
          to mdx. {"It'll"} take some time, so articles {"won't"} be here for a while... some may
          trinkle in slowly but {"it'll"} all be up eventually... soon <sup>TM</sup>
        </p>
      </Callout>

      <h2 className={typographyVariants({ variant: "h2" })}>Articles</h2>

      <p
        className={cn(
          typographyVariants({
            variant: "h4",
            className: "bg-background font-body text-muted-foreground",
          })
        )}
      >
        {allContentData.length} Articles
      </p>

      <ul className="space-y-8">
        {allContentData.map((contentData) => {
          return <WritingCard key={contentData.slug} content={contentData} />
        })}
      </ul>
    </main>
  )
}
