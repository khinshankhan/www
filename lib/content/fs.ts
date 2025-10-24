import fs from "fs"
import path from "path"
import { segmentText } from "@/lib/routing"
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

export async function getContentDataByAbsolutePath(filePath: string) {
  const fileContent = await fs.promises.readFile(filePath, "utf8")

  const relPath = filePath.replace(CONTENT_DIR, "")
  const segments = segmentText(relPath)

  return {
    ghSlug: filePath.replace(PROJECT_DIR, ""),
    segments,
    slug:
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
      "/",
    baseName: path.basename(filePath),
    groups: segments.filter((segment) => segment.type === "paren").map((segment) => segment.value),
    fileContent,
  }
}
