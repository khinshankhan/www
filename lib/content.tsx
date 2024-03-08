import fs from "fs"
import path from "path"
import { globbySync } from "globby"
import matter from "gray-matter"
import { z } from "zod"

const projectRoot = process.cwd()
const contentDir = path.join(projectRoot, "content")
// TODO: turn this into `"**/page*.mdx"` when dealing with i18n
// eg page.es.mdx will be spanish
const contentPattern = ["**/*.mdx"]

export const ContentFrontmatterSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
})

export type ContentFrontmatter = z.infer<typeof ContentFrontmatterSchema>

export const ContentSourceTypes = ["root", "writings", "projects"] as const
export type ContentSource = (typeof ContentSourceTypes)[number]

export const ContentDataSchema = z.object({
  slug: z.string(),
  source: z.enum(ContentSourceTypes),
  frontmatter: ContentFrontmatterSchema,
  content: z.string(),
})

export type ContentData = z.infer<typeof ContentDataSchema>

function getContentSource(slug: string): ContentSource {
  if (slug.startsWith("writings")) return "writings"
  if (slug.startsWith("projects")) return "projects"
  return "root"
}

export function getContentData(filePath: string) {
  const absFilePath = path.join(contentDir, filePath)
  if (!fs.existsSync(absFilePath)) {
    return null
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

  return filePaths.map((filePath) => {
    return getContentData(filePath)!
  })
}

export function getContentDataBySource(source: ContentSource) {
  const contentData = getAllContentData()
  return contentData.filter((content) => content.source === source)
}
