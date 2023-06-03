import { defineDocumentType, type ComputedFields, type FieldDefs } from "contentlayer/source-files"
import Slugger from "github-slugger"
import { chopOffWord } from "../utils/string"

interface IFieldsProps {
  subtitle?: string
  status?: string
}
const getFields = ({
  subtitle = "Doing my best :writing_hand:",
  status = "published",
}: IFieldsProps): FieldDefs => ({
  title: {
    type: "string",
    required: true,
  },
  subtitle: {
    type: "string",
    default: subtitle,
  },
  givenSlug: {
    type: "string",
    required: false,
  },

  planted: {
    type: "date",
    required: false,
  },
  tended: {
    type: "date",
    required: true,
  },

  status: {
    type: "enum",
    options: ["draft", "published"],
    default: status,
  },

  tags: {
    type: "list",
    of: {
      type: "string",
    },
    required: false,
  },
  categories: {
    type: "list",
    of: {
      type: "string",
    },
    required: false,
  },

  cover: {
    type: "json",
    required: false,
  },
})

export interface Computed {
  frontmatter: {
    title: string
    subtitle: string
    planted: string
    tended: string
    cover: {
      img: string
      alt: string
    }
  }
  tags: string[]
  headings: {
    level: number
    content: string
    id: string
  }[]
}

interface IComputedFieldsProps {
  prefix: string
  chopPrefix?: boolean
}
// NOTE: T extends union of documents types
const getComputedFields = <T extends "Page" | "Writing">({
  prefix,
  chopPrefix = false,
}: IComputedFieldsProps): ComputedFields<T> => {
  const cleanPath = chopOffWord(prefix, false)
  const regexHeadings = /^(?<tag>#{1,6})[ ](?<content>[^\n]+)/gm

  return {
    slug: {
      type: "string",
      resolve: function getSlug(doc) {
        if (doc?.givenSlug) {
          return doc.givenSlug
        }

        let p = doc._raw.sourceFileDir
        if (!["page.md", "index.md"].includes(doc._raw.sourceFileName)) {
          p = doc._raw.flattenedPath
        }

        if (chopPrefix) {
          p = cleanPath(p).slice(1)
        }

        return p
      },
    },

    computed: {
      type: "json",
      resolve: function getComputed(doc) {
        const tags = Array.from(new Set<string>(doc?.tags ?? [])).sort()

        // use same package as rehypeSlug so toc and sluggified headings match
        // https://github.com/rehypejs/rehype-slug/blob/main/package.json#L36
        // a new slugger should be declared per document
        const slugs = new Slugger()

        const headings = Array.from(doc.body.raw.matchAll(regexHeadings)).map(
          ([, tag, content]) => ({
            level: tag.length,
            content: content,
            id: slugs.slug(content, false),
          })
        )

        let cover = {} as Computed["frontmatter"]["cover"]
        if (doc.cover?.img) {
          cover.img = doc.cover.img
        } else {
          cover.img =
            // TODO: replace with decent cover image
            // TODO: replace based on path?
            "https://images.unsplash.com/photo-1636193535246-a07cd0aa6fcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
        }

        cover.alt = doc.cover?.alt ? doc.cover.alt : `Cover image for ${doc.title}`

        return {
          frontmatter: {
            title: doc.title,
            subtitle: doc.subtitle,
            // chop of tz info since it's wrong (Z)
            planted: doc.planted?.slice(0, -1) ?? "",
            tended: doc.tended.slice(0, -1),
            cover,
          },
          tags,
          headings,
        } satisfies Computed
      },
    },
  }
}

export const Page = defineDocumentType(() => ({
  name: "Page",
  contentType: "mdx",
  filePathPattern: "pages/**/*.md",
  fields: getFields({}),
  computedFields: getComputedFields<"Page">({
    prefix: "pages",
    chopPrefix: true,
  }),
}))

export const Writing = defineDocumentType(() => ({
  name: "Writing",
  contentType: "mdx",
  filePathPattern: "writings/**/*.md",
  fields: getFields({}),
  computedFields: getComputedFields<"Writing">({
    prefix: "writings",
    chopPrefix: false,
  }),
}))
