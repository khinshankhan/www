import React from "react"
import type { Metadata } from "next"
import { DuotoneLayout } from "@/components/layouts/duotone"
import { Shell } from "@/components/layouts/elements/shell"
import { WithSidebar } from "@/components/layouts/with-sidebar"
import { getAllContentData } from "@/lib/content/source"
import { createMetadata, processMarkdownAttribute } from "@/lib/seo/open-graph"
import { Callout } from "@/quicksilver/react/primitives/callout"
import { Link } from "@/quicksilver/react/primitives/link"

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

  return (
    <Shell>
      <DuotoneLayout title={title} description={description} ghPath={ghPath}>
        <WithSidebar sidebar={null} direction="right">
          <div className="mx-auto min-w-full">
            <div className="flex grow flex-col gap-4">
              <Callout variant="note" title="Work in Progress" icon={null}>
                I am currently working on converting my previous articles from different formats to
                markdown. This process will take some time. Stay tuned... coming soon!
              </Callout>

              <div className="prose">
                <ul>
                  {posts.map((page) => (
                    <li key={page.computed.ghSlug}>
                      <Link href={page.slug}>{page.frontmatter.title}</Link>
                    </li>
                  ))}
                </ul>
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
