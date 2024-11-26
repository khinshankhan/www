import { z } from "zod"

export const ContentSourceTypes = ["root", "writings", "projects"] as const
export type ContentSource = (typeof ContentSourceTypes)[number]

export function getContentSource(slug: string): ContentSource {
  if (slug.startsWith("writings")) return "writings"
  if (slug.startsWith("projects")) return "projects"
  return "root"
}

export const ContentLdTypes = ["WebPage", "BlogPosting", "CollectionPage"] as const
export type ContentLdType = (typeof ContentLdTypes)[number]

// prettier-ignore
const defaultContentLd: Record<ContentSource, ContentLdType> = {
  root: "WebPage",
  writings: "BlogPosting",
  projects: "CollectionPage",
}

const ImageSchema = z.object({ url: z.string(), alt: z.string() })

export const ContentFrontmatterSchema = z
  .object({
    // required
    slug: z.string(),
    title: z.string(),
    subtitle: z.string(),
    excerpt: z.string(),

    dateCreated: z.instanceof(Date),
    datePublished: z.instanceof(Date),
    dateModified: z.instanceof(Date),

    // seo
    description: z.string().optional(),
    keywords: z.array(z.string()).optional().default([]),
    coverImage: ImageSchema.optional().default({
      url: "/images/placeholder.png?v=1",
      alt: "Placeholder image",
    }),

    og: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
      })
      .optional(),

    ld: z
      .object({
        type: z.enum(ContentLdTypes).optional(),
        name: z.string().optional(),
        description: z.string().optional(),
      })
      .optional(),

    // appearance
    showToc: z.boolean().optional(),
    markExcerpt: z.boolean().optional(),

    // misc
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
    const source = getContentSource(data.slug)

    return {
      ...data,
      description: data.description ?? data.excerpt,
      ld: {
        type: data.ld?.type ?? defaultContentLd[source],
        name: data.ld?.name ?? data.title,
        description: data.ld?.description ?? data.description ?? data.excerpt,
      },
      showToc: data.showToc ?? { root: true, writings: true, projects: false }[source],
      markExcerpt: data.markExcerpt ?? true,
    }
  })

// prettier-ignore
export type ContentFrontmatter = z.infer<typeof ContentFrontmatterSchema>

export const ComputedDataSchema = z.object({
  baseName: z.string(),
  toc: z.array(z.object({ id: z.string(), title: z.string(), depth: z.number().min(1).max(6) })),
  // TODO: undecided if I want to use these
  // wordCount: z.number().optional(),
  // readingTime: z.number().optional(),
})

export const ContentDataSchema = z.object({
  slug: z.string(),
  source: z.enum(ContentSourceTypes),
  frontmatter: ContentFrontmatterSchema,
  computed: ComputedDataSchema,
  content: z.string(),
})

// prettier-ignore
export type ContentData = z.infer<typeof ContentDataSchema>
