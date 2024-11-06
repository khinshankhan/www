import fs from "fs"
import path from "path"
import React from "react"
import { ContentLayout } from "@/components/template/content-layout"
import matter from "gray-matter"
import { MDXRemote } from "next-mdx-remote/rsc"

const projectRoot = process.cwd()
const thisDir = path.join(
  projectRoot,
  "app",
  "(content)",
  "writings",
  "todo-remove-test",
  "playground"
)

export default async function Page() {
  const absFilePath = path.join(thisDir, "./content.md")
  const fileContent = await fs.promises.readFile(absFilePath, "utf8")
  const { data, content } = matter(fileContent)

  return (
    <ContentLayout
      title={data.title}
      subtitle={data.subtitle}
      ghPath="/app/(content)/writings/todo-remove-test/playground/content.tsx"
    >
      <MDXRemote source={content} />
    </ContentLayout>
  )
}
