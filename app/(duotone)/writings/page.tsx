import React from "react"
import type { Metadata } from "next"
import { Emoji } from "@/components/emoji"
import { DuotoneLayout } from "@/components/layouts/duotone"
import { Header } from "@/components/layouts/elements/header"
import { Shell } from "@/components/layouts/elements/shell"
import { WithSidebar } from "@/components/layouts/with-sidebar"
import { getAllContentData } from "@/lib/content/source"
import { createMetadata, processMarkdownAttribute } from "@/lib/seo/open-graph"
import { Callout } from "@/quicksilver/react/patterns/content/callout"
import { Link } from "@/quicksilver/react/primitives/link"
import { Text } from "@/quicksilver/react/primitives/text"
import { WritingsSearch, type WritingSummary } from "./writings-search"

const title = "Writings"
const description =
  "A collection of my ramblings, thoughts, and half-baked explorations -- a sidequest that gets updated once in a blue moon."
const ghPath = "/app/(duotone)/writings/page.tsx"
const slug = "/writings"

async function getPostsList() {
  const list = await getAllContentData()
  return list.filter((data) => data.source === "posts")
}

export default async function Page() {
  const posts = await getPostsList()
  // ship only list fields; run descriptions through remark here (once, server-side) rather
  // than per-card on every keystroke
  const summaries: WritingSummary[] = posts.map((post) => ({
    slug: post.slug,
    title: post.frontmatter.title,
    description: processMarkdownAttribute(post.frontmatter.description),
    tags: post.frontmatter.tags,
  }))

  return (
    // hide the header's edge fade; its gradient would wash over the sticky search once scrolled
    <Shell header={<Header edgeFadeProps={{ className: "hidden" }} />}>
      <DuotoneLayout title={title} description={description} ghPath={ghPath}>
        <WithSidebar sidebar={null} direction="right">
          <div className="mx-auto min-w-full">
            <div className="flex grow flex-col gap-8">
              <div className="flex flex-col gap-4">
                {summaries.length === 0 ? (
                  <Callout variant="warning" icon={null}>
                    <Text className="mx-auto max-w-[55ch] text-center">
                      Uh oh, it seems no articles are available right now. Check back soon! In the
                      meantime, perhaps look out for an <Link href="/">easter egg</Link>?{" "}
                      <Emoji name=":flushed:" />
                    </Text>
                  </Callout>
                ) : (
                  <WritingsSearch
                    posts={summaries}
                    banner={
                      <Callout variant="note" title="Work in Progress" icon={null}>
                        I am currently working on converting my previous articles from different
                        formats to markdown. This process will take some time. Stay tuned... coming
                        soon!
                      </Callout>
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </WithSidebar>
      </DuotoneLayout>
    </Shell>
  )
}

export function generateMetadata(): Metadata | undefined {
  return createMetadata({
    title,
    description: processMarkdownAttribute(description),
    slug,
  })
}
