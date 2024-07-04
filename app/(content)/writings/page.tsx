import React from "react"
import { type ContentData } from "@/schemas/content"
import { flags } from "@/settings"
import { getContentDataBySource } from "@/lib/content"
import { cn } from "@/lib/utils"
import { Callout } from "@/components/callout"
import { typographyVariants } from "@/components/primitives/typography"
import { WritingList } from "@/components/writing-list"

export default async function Writings() {
  const writingContentData = await getContentDataBySource("writings")

  return (
    <main className="flex flex-col gap-4">
      <Callout variant="note" heading="Work in Progress">
        <p>
          {"I'm"} currently working on converting my previous articles from different formats to
          markdown. This process will take some time. Stay tuned... coming soon!
        </p>
      </Callout>

      <h2 className={typographyVariants({ variant: "h2" })}>Articles</h2>

      <p
        className={cn(
          typographyVariants({
            variant: "h4",
            className: "font-body text-muted-foreground",
          })
        )}
      >
        {writingContentData.length} Articles
      </p>

      <WritingList writingContentData={writingContentData} />
    </main>
  )
}
