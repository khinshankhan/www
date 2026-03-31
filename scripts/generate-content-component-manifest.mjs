import fs from "fs/promises"
import path from "path"
import fg from "fast-glob"

const projectDir = process.cwd()
const contentDir = path.join(projectDir, "content")
const outputPath = path.join(projectDir, ".generated/content/components.manifest.ts")

function toPosixPath(value) {
  return value.split(path.sep).join("/")
}

function slugFromComponentPath(relativePath) {
  const withoutPrefix = relativePath.replace(/^content\//, "")
  const directory = path.posix.dirname(withoutPrefix)
  const slugParts = directory
    .split("/")
    .filter((part) => part !== "" && !(part.startsWith("(") && part.endsWith(")")))

  return `/${slugParts.join("/")}/`
}

const componentFiles = (
  await fg("**/components.tsx", {
    cwd: contentDir,
    dot: false,
    onlyFiles: true,
    followSymbolicLinks: false,
  })
).sort()

const entries = componentFiles.map((relativeFile) => {
  const relativeFromProject = toPosixPath(path.posix.join("content", relativeFile))
  const slug = slugFromComponentPath(relativeFromProject)

  return `  ${JSON.stringify(slug)}: () => import("@/${relativeFromProject.replace(/\.tsx$/, "")}"),`
})

const contents = `import type { MDXComponents } from "mdx/types"

type ContentMdxComponentLoader = () => Promise<unknown>

export const contentMdxComponentLoaders: Record<string, ContentMdxComponentLoader> = {
${entries.join("\n")}
}

export type { MDXComponents }
`

await fs.mkdir(path.dirname(outputPath), { recursive: true })
await fs.writeFile(outputPath, contents)
