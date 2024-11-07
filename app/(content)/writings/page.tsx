import React from "react"
import { Heading } from "@/components/base/typography"
import { ContentLayout } from "@/components/template/content-layout"

export default async function Page() {
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
    </ContentLayout>
  )
}
