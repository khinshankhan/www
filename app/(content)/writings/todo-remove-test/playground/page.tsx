import React from "react"
import { ContentLayout } from "@/components/template/content-layout"

export default async function Page() {
  return (
    <ContentLayout
      title="Playground"
      subtitle="Where Things are Perfectly Broken"
      ghPath="/app/(content)/writings/todo-remove-test/playground/page.tsx"
    >
      <p>I like icecream... with a cherry on top!</p>
    </ContentLayout>
  )
}
