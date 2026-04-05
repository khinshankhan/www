/* global process */

import fs from "fs/promises"
import path from "path"
import assetConfig from "../excalidraw-assets.json" with { type: "json" }

const projectDir = process.cwd()
const sourceDir = path.join(projectDir, "node_modules", "@excalidraw", "excalidraw", "dist", "prod", "fonts")
const publicDir = path.join(projectDir, "public")
const targetDir = path.join(publicDir, assetConfig.dir, "fonts")

await fs.mkdir(path.dirname(targetDir), { recursive: true })

const publicEntries = await fs.readdir(publicDir, { withFileTypes: true }).catch(() => [])
await Promise.all(
  publicEntries
    .filter((entry) => entry.isDirectory() && entry.name.startsWith("excalidraw-assets"))
    .filter((entry) => entry.name !== assetConfig.dir)
    .map((entry) => fs.rm(path.join(publicDir, entry.name), { recursive: true, force: true }))
)

await fs.rm(targetDir, { recursive: true, force: true })
await fs.cp(sourceDir, targetDir, { recursive: true })
