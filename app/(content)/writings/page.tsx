import React from "react"
import { Heading } from "@/components/base/typography"
import { SmartLink } from "@/components/composite/smart-link"
import { ContentLayout } from "@/components/template/content-layout"
import { listAllContentData } from "@/lib/content"

async function listWritingsContentData() {
  return await listAllContentData({
    filter: (contentData) => contentData.source === "writings",
  })
}

export default async function Page() {
  const contentData = await listWritingsContentData()

  return (
    <ContentLayout
      title="Writings"
      subtitle="My ramblings and some thoughts"
      ghPath="/app/(content)/writings/page.tsx"
      childrenWrappingClass=""
    >
      <Heading as="h2" variant="h2">
        Articles
      </Heading>

      <ul>
        {contentData.map((data) => (
          <li key={data.slug}>
            <SmartLink href={`/${data.slug}`}>{data.frontmatter.title}</SmartLink>
          </li>
        ))}
      </ul>
    </ContentLayout>
  )
}
