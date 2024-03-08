import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { ContentFrontmatterSchema } from "../schemas/content"

// Function to validate frontmatter using Zod schema
function validateFrontmatter(frontmatter: any) {
  try {
    ContentFrontmatterSchema.parse(frontmatter)
    return true // Frontmatter is valid
  } catch (error) {
    console.error("Frontmatter validation error:", error)
    return false // Frontmatter is invalid
  }
}

// Recursive function to process markdown files
function processMarkdownFiles(directory: string) {
  const files = fs.readdirSync(directory)

  for (const file of files) {
    const filePath = path.join(directory, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      // Recursively process subdirectory
      processMarkdownFiles(filePath)
    } else if (file.endsWith(".md")) {
      // Process markdown file
      const fileContent = fs.readFileSync(filePath, "utf-8")
      const { data } = matter(fileContent)

      // Validate frontmatter
      if (validateFrontmatter(data)) {
        console.log(`Frontmatter in ${filePath} is valid.`)
      } else {
        console.log(`Frontmatter in ${filePath} is invalid.`)
      }
    }
  }
}

// Example usage
const markdownDirectory = "../content"
processMarkdownFiles(markdownDirectory)

console.log("hello there homes")
