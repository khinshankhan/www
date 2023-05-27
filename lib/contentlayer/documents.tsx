import { defineDocumentType, type ComputedFields, type FieldDefs } from "contentlayer/source-files"
import Slugger from "github-slugger"
import { chopOffWord } from "../utils/string"

interface IFieldsProps {
  subtitle: string
  status?: string
}
const getFields = ({ subtitle, status = "published" }: IFieldsProps): FieldDefs => ({
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
  },
  categories: {
    type: "list",
    of: {
      type: "string",
    },
  },
})

export interface Computed {
  frontmatter: {
    title: string
    subtitle: string
    planted: string
    tended: string
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
const getComputedFields = <T extends "Page">({
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

        return {
          frontmatter: {
            title: doc.title,
            subtitle: doc.subtitle,
            // chop of tz info since it's wrong (Z)
            planted: doc.planted?.slice(0, -1) ?? "",
            tended: doc.tended.slice(0, -1),
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
  fields: getFields({
    subtitle: `Doing my best :writing_hand:`,
  }),
  computedFields: getComputedFields<"Page">({
    prefix: "pages",
    chopPrefix: true,
  }),
}))
