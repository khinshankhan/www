import fs from "fs"
import path from "path"
import { globby } from "globby"
import matter from "gray-matter"
import { remark } from "remark"
import { remarkExcerptExport } from "@/lib/mdx-plugins/remark-except"
import { remarkTocExport, type TocItem } from "@/lib/mdx-plugins/remark-toc"
import { existPredicate } from "@/lib/utils"

const projectRoot = process.cwd()
const contentDir = path.join(projectRoot, "content")
// TODO: turn this into `"**/page*.mdx"` when dealing with i18n
// eg page.es.mdx will be spanish
const contentPatterns = ["**/*.md", "**/*.mdx"]

type ContentSource = "root" | "writings" | "projects"
function getContentSource(slug: string): ContentSource {
  if (slug.startsWith("writings")) return "writings"
  if (slug.startsWith("projects")) return "projects"
  return "root"
}

const defaultShowToc: Record<ContentSource, boolean> = {
  root: true,
  writings: true,
  projects: false,
}

export async function getContentDataByFilePath(filePath: string) {
  const absFilePath = path.join(contentDir, filePath)
  if (!fs.existsSync(absFilePath)) {
    throw new Error(`File path is missing: ${absFilePath}`)
  }

  const fileContent = await fs.promises.readFile(absFilePath, "utf8")

  const slug = filePath.split("/").slice(0, -1).join("/")
  const source = getContentSource(slug)

  const { data, content } = matter(fileContent)

  const computedData = remark()
    .use(remarkExcerptExport)
    .use(remarkTocExport, { reservedIds: ["excerpt"] })
    .processSync(content)

  const frontmatter = {
    showToc: defaultShowToc[source],
    markExcerpt: true,
    ...data,
  }

  return {
    content,
    slug,
    source,
    data,
    computed: {
      baseName: path.basename(filePath),
      // NOTE: this is guaranteed because of remarkExcerptExport
      excerpt: (computedData?.data?.excerpt ?? "") as string,
      // NOTE: this is guaranteed because of remarkTocExport
      toc: (computedData?.data?.toc ?? []) as TocItem[],
    },
    frontmatter,
  }
}

export async function getAllContentData(getContentDataFromFilePath = getContentDataByFilePath) {
  const filePaths = await globby(contentPatterns, { cwd: contentDir })
  const allContentDataPromises = filePaths.map(async (filePath) => {
    try {
      return getContentDataFromFilePath(filePath)
    } catch (err) {
      return null
    }
  })
  const allContentData = await Promise.all(allContentDataPromises)

  const allValidContentData = allContentData.filter(existPredicate)
  return allValidContentData
}

export async function getContentDataBySource(source: ContentSource) {
  const contentData = await getAllContentData()
  return contentData.filter((content) => content.source === source)
}