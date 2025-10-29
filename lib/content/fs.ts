import fs from "fs"
import path from "path"
import { segmentText, type GroupSegment } from "@/lib/routing"
import fg from "fast-glob"

export const PROJECT_DIR = process.cwd()
export const CONTENT_DIR = path.join(PROJECT_DIR, "content")

export async function findContentFilesAbsolutePaths(): Promise<string[]> {
  const rels = await fg(
    // NOTE: we will be able to turn this into `"**/page*.mdx"` when dealing with i18n once i18n support evolves
    // eg page.mdx -> english, page.es.mdx -> spanish
    "**/*.{md,mdx}",
    {
      cwd: CONTENT_DIR,
      dot: false,
      onlyFiles: true,
      followSymbolicLinks: false,
      ignore: ["**/node_modules/**", "**/.git/**"],
    }
  )

  // return absolute paths
  return rels.map((rel) => path.join(CONTENT_DIR, rel))
}

export function calculateSegmentsFromFilePath(filePath: string): GroupSegment[] {
  const relPath = filePath.replace(CONTENT_DIR, "")
  const segments = segmentText(relPath)
  return segments
}

export function calculateSlugFromSegments(segments: GroupSegment[]): string {
  return (
    "/" +
    segments
      .filter((segment) => segment.type === "text")
      .map((segment) => segment.value.trim())
      .filter((part) => part !== "" && part !== "/")
      .join("/")
      .split("/")
      .map((part) => part.trim())
      .filter((part) => part !== "")
      .slice(0, -1)
      .join("/") +
    "/"
  )
}

export interface ContentMeta {
  ghSlug: string
  segments: GroupSegment[]
  slug: string
  baseName: string
  groups: string[]
  fileContent: string
}

export async function getContentMetaByAbsolutePath(filePath: string): Promise<ContentMeta> {
  const fileContent = await fs.promises.readFile(filePath, "utf8")

  const segments = calculateSegmentsFromFilePath(filePath)

  return {
    ghSlug: filePath.replace(PROJECT_DIR, ""),
    segments,
    slug: calculateSlugFromSegments(segments),
    baseName: path.basename(filePath),
    groups: segments.filter((segment) => segment.type === "paren").map((segment) => segment.value),
    fileContent,
  }
}
