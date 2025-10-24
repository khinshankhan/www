import { type GroupSegment } from "@/lib/routing"
import { z } from "zod"

export const contentSources = ["pages", "collections", "series", "posts"] as const
export type ContentSource = (typeof contentSources)[number]

const ContentSourceSchema = z.enum(contentSources)

export function getContentSource(segments?: GroupSegment[]): ContentSource {
  const firstGroupSegment = segments?.find((segment) => segment.type === "paren")
  const parsed = ContentSourceSchema.safeParse(firstGroupSegment?.value)
  return parsed.success ? parsed.data : "pages"
}

const defaultShowTocForSource: Record<ContentSource, boolean> = {
  pages: true,
  collections: false,
  series: true,
  posts: true,
}

export const ContentFrontmatterSchema = z
  .object({
    // required fields
    source: ContentSourceSchema,
    title: z.string(),
    description: z.string(),

    dateCreated: z.instanceof(Date),
    datePublished: z.instanceof(Date),
    dateModified: z.instanceof(Date),

    // seo fields
    keywords: z.array(z.string()).optional().default([]),

    og: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
      })
      .optional(),

    // appearance fields
    showToc: z.boolean().optional(),
    markExcerpt: z.boolean().optional(),

    // misc fields
    draft: z.boolean().optional().default(false),
    // priority for sorting, lower is higher in priority
    // based on linux nice values used for process priority
    nice: z.number().min(-20).max(19).optional().default(0),
    tags: z.array(z.string()).optional().default([]),

    // for blogpostings
    recommended: z.array(z.string()).optional().default([]),

    // for collectionpages
    collection: z.array(z.string()).optional().default([]),
  })
  .transform((data) => {
    const { source } = data

    return {
      ...data,
      og: {
        title: data?.og?.title ?? data.title,
        description: data?.og?.description ?? data.description,
      },
      showToc: data.showToc ?? defaultShowTocForSource[source],
      markExcerpt: data.markExcerpt ?? true,
    }
  })

export const ComputedDataSchema = z.object({
  baseName: z.string(),
  ghSlug: z.string(),
  groups: z.array(z.string()).optional(),
  toc: z.array(z.object({ id: z.string(), title: z.string(), depth: z.number().min(1).max(6) })),
  // TODO: undecided if I want to use these
  // wordCount: z.number().optional(),
  // readingTime: z.number().optional(),
})

export const ContentDataSchema = z.object({
  slug: z.string(),
  source: ContentSourceSchema,
  frontmatter: ContentFrontmatterSchema,
  computed: ComputedDataSchema,
  content: z.string(),
})

export type ContentData = z.infer<typeof ContentDataSchema>
