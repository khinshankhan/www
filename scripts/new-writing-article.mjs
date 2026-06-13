import fs from "node:fs/promises"
import path from "node:path"
import GithubSlugger from "github-slugger"

const WRITINGS_DIR = path.join(process.cwd(), "content", "(posts)", "writings")

function getTitleFromArgs(argv) {
  const args = argv.slice(2)
  const positional = []

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index]

    if (arg === "--") {
      continue
    }

    if (arg === "--title" || arg === "-t") {
      const value = args[index + 1]
      if (!value) {
        throw new Error("Expected a value after --title.")
      }

      return value.trim()
    }

    positional.push(arg)
  }

  return positional.join(" ").trim()
}

function formatDate(date = new Date()) {
  return date.toISOString().slice(0, 10)
}

function buildArticleTemplate({ date, title }) {
  return `---
title: ${title}
description: TODO
dateCreated: ${date}
datePublished: ${date}
dateModified: ${date}
---

TODO complete this
`
}

async function main() {
  const title = getTitleFromArgs(process.argv)

  if (!title) {
    throw new Error("Provide a title. Example: pnpm run content:new -- \"My New Article\"")
  }

  const slugger = new GithubSlugger()
  const slug = slugger.slug(title)

  if (!slug) {
    throw new Error("Could not derive a slug from the provided title.")
  }

  const articleDir = path.join(WRITINGS_DIR, slug)
  const articlePath = path.join(articleDir, "page.md")

  try {
    await fs.access(articlePath)
    throw new Error(`Article already exists at ${path.relative(process.cwd(), articlePath)}`)
  } catch (error) {
    if (!(error && typeof error === "object" && "code" in error && error.code === "ENOENT")) {
      throw error
    }
  }

  await fs.mkdir(articleDir, { recursive: true })
  await fs.writeFile(articlePath, buildArticleTemplate({ date: formatDate(), title }), "utf8")

  console.log(path.relative(process.cwd(), articlePath))
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exitCode = 1
})
