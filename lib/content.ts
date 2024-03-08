import fs from "fs"
import path from "path"
import { ContentDataSchema, type ContentSource } from "@/schemas/content"
import { globbySync } from "globby"
import matter from "gray-matter"
import { existPredicate } from "./utils"

const projectRoot = process.cwd()
const contentDir = path.join(projectRoot, "content")
// TODO: turn this into `"**/page*.mdx"` when dealing with i18n
// eg page.es.mdx will be spanish
const contentPattern = ["**/*.mdx"]

function getContentSource(slug: string): ContentSource {
  if (slug.startsWith("writings")) return "writings"
  if (slug.startsWith("projects")) return "projects"
  return "root"
}

export function getContentData(filePath: string) {
  const absFilePath = path.join(contentDir, filePath)
  if (!fs.existsSync(absFilePath)) {
    throw new Error(`File path is missing: ${absFilePath}`)
  }

  const fileContent = fs.readFileSync(absFilePath, "utf-8")

  const slug = filePath.split("/").slice(0, -1).join("/")
  const { data, content } = matter(fileContent)

  const contentData = {
    slug,
    source: getContentSource(slug),
    frontmatter: data,
    content,
  }

  ContentDataSchema.parse(contentData)
  return contentData
}

export function getAllContentData() {
  const filePaths = globbySync(contentPattern, { cwd: contentDir })
  const allContentData = filePaths.map((filePath) => {
    try {
      return getContentData(filePath)
    } catch (err) {
      return null
    }
  })

  const allValidContentData = allContentData.filter(existPredicate)
  return allValidContentData
}

export function getContentDataBySource(source: ContentSource) {
  const contentData = getAllContentData()
  return contentData.filter((content) => content.source === source)
}
