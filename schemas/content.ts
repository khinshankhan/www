import { z } from "zod"

export const ContentFrontmatterSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  datePublished: z.instanceof(Date),
  dateModified: z.instanceof(Date),
  // tags: z.array(z.string()).optional().default([]),
  // draft: z.boolean().optional().default(false),
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
