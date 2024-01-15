import fs from "fs"
import path from "path"
import { globbySync } from "globby"
import matter from "gray-matter"

const projectRoot = process.cwd()
const contentDir = path.resolve(projectRoot, "content")
// TODO: turn this into `"**/page*.md"` when dealing with i18n
// eg page.es.md will be spanish
const contentPattern = ["**/page.md"]

export function getContentData(filePath: string) {
  const absFilePath = path.resolve(contentDir, filePath)
  if (!fs.existsSync(absFilePath)) {
    throw new Error(`File does not exist: ${absFilePath}`)
  }

  const fileContent = fs.readFileSync(absFilePath, "utf-8")

  const slug = path.dirname(filePath)
  const { data, content } = matter(fileContent)

  return {
    absFilePath,
    rawContent: fileContent,
    slug,
    // TODO: properly parse frontmatter
    frontmatter: {
      title: "TODO",
      subtitle: "TODO",
      ...data,
    },
    content,
  }
}

export function getAllContentData() {
  const filePaths = globbySync(contentPattern, { cwd: contentDir })

  return filePaths.map((filePath) => {
    return getContentData(filePath)
  })
}
