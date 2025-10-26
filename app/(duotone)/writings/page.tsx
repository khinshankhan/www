import React from "react"
import type { Metadata } from "next"
import { Emoji } from "@/components/emoji"
import { DuotoneLayout } from "@/components/layouts/duotone"
import { Shell } from "@/components/layouts/elements/shell"
import { WithSidebar } from "@/components/layouts/with-sidebar"
import { type ContentData } from "@/lib/content/schema"
import { getAllContentData } from "@/lib/content/source"
import { createMetadata, processMarkdownAttribute } from "@/lib/seo/open-graph"
import { cn } from "@/quicksilver/lib/classname"
import { Callout } from "@/quicksilver/react/primitives/callout"
import { Link } from "@/quicksilver/react/primitives/link"
import { H2, H3, Span, Text } from "@/quicksilver/react/primitives/text"

const title = "Writings"
const description =
  "A collection of my ramblings, thoughts, and half-baked explorations -- a sidequest that gets updated once in a blue moon."
const ghPath = "/app/(duotone)/writings/page.tsx"
const slug = "/writings"

async function getPostsList() {
  const list = await getAllContentData()
  return list.filter((data) => data.source === "posts")
}

function WritingCard({ content, right = false }: { content: ContentData; right?: boolean }) {
  const textAlign = right ? "text-right" : "text-left"

  return (
    <li className="link-box w-full overflow-hidden rounded-lg border border-solid border-accent-8 bg-background-1 shadow-none transition-all duration-700 ease-in-out group-hover:shadow-accent-8 hover:-translate-y-2 hover:border-accent-11 hover:bg-surface-5/25 hover:shadow-[0px_0px_10px_1px]">
      <div
        className={cn(
          "flex size-full flex-col-reverse",
          right ? "md:flex-row-reverse" : "md:flex-row"
        )}
      >
        <div className="flex grow flex-col gap-2 p-4">
          <H3 className={cn("line-clamp-2 md:line-clamp-1", textAlign)}>
            <Link href={content.slug} className="link-overlay">
              {content.frontmatter.title}
            </Link>
          </H3>

          <Span className={cn("line-clamp-3 text-foreground-muted md:line-clamp-2", textAlign)}>
            {processMarkdownAttribute(content.frontmatter.description)}
          </Span>
        </div>
      </div>
    </li>
  )
}

export default async function Page() {
  const posts = await getPostsList()

  return (
    <Shell>
      <DuotoneLayout title={title} description={description} ghPath={ghPath}>
        <WithSidebar sidebar={null} direction="right">
          <div className="mx-auto min-w-full">
            <div className="flex grow flex-col gap-8">
              <Callout variant="note" title="Work in Progress" icon={null}>
                I am currently working on converting my previous articles from different formats to
                markdown. This process will take some time. Stay tuned... coming soon!
              </Callout>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <H2>Articles</H2>
                  <Text className="text-foreground-muted">
                    {`Dive into all ${posts.length} articles!`}
                  </Text>
                </div>

                {posts.length === 0 ? (
                  <Callout variant="warning" icon={null}>
                    <Text className="mx-auto max-w-[55ch] text-center">
                      Uh oh, it seems no articles are available right now. Check back soon! In the
                      meantime, perhaps look out for an <Link href="/">easter egg</Link>?{" "}
                      <Emoji name=":flushed:" />
                    </Text>
                  </Callout>
                ) : (
                  <ul className="flex flex-col gap-8">
                    {posts.map((post) => (
                      <WritingCard key={post.slug} content={post} />
                    ))}
                  </ul>
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
