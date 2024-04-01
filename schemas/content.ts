import { z } from "zod"

const ImageSchema = z.object({ url: z.string(), alt: z.string() })

export const ContentLdTypes = ["WebPage", "BlogPosting", "CollectionPage"] as const
export type ContentLdType = (typeof ContentLdTypes)[number]

export const ContentFrontmatterSchema = z.object({
  // required
  title: z.string(),
  subtitle: z.string(),

  dateCreated: z.instanceof(Date).optional(),
  datePublished: z.instanceof(Date).optional(),
  dateModified: z.instanceof(Date).optional(),

  // seo
  description: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  coverImage: ImageSchema.optional().default({
    url: "/images/placeholder.png",
    alt: "Placeholder image",
  }),

  og: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      image: ImageSchema.optional(),
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
  showToc: z.boolean().optional().default(true),

  // misc
  draft: z.boolean().optional().default(false),
  priority: z.number().optional().default(0),
  tags: z.array(z.string()).optional().default([]),

  // for blogpostings
  recommended: z.array(z.string()).optional().default([]),

  // for collectionpages
  collection: z.array(z.string()).optional().default([]),
})

export type ContentFrontmatter = z.infer<typeof ContentFrontmatterSchema>

export const ComputedDataSchema = z.object({
  baseName: z.string(),
  excerpt: z.string(),
  toc: z.array(z.object({ id: z.string(), text: z.string(), level: z.number().min(1).max(6) })),
  // TODO: undecided if I want to use these
  // wordCount: z.number().optional(),
  // readingTime: z.number().optional(),
})

export const ContentSourceTypes = ["root", "writings", "projects"] as const
export type ContentSource = (typeof ContentSourceTypes)[number]

export const ContentDataSchema = z.object({
  slug: z.string(),
  source: z.enum(ContentSourceTypes),
  frontmatter: ContentFrontmatterSchema,
  computed: ComputedDataSchema,
  content: z.string(),
})

export type ContentData = z.infer<typeof ContentDataSchema>
