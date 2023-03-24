import type { ComputedFields, FieldDefs } from "contentlayer/source-files"
import Slugger from "github-slugger"
import { bundleMDX } from "mdx-bundler"
import remarkGfm from "remark-gfm"

import { chopOffWord } from "../../utils"
import { remarkSetExcerpt, remarkSimpleEmoji } from "../plugins"

interface IFieldsProps {
  subtitle: string
  status?: "draft" | "published"
  toc?: boolean
}
export const getFields = ({
  subtitle,
  status = "published",
  toc = true,
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

  toc: {
    type: "boolean",
    default: toc,
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
  mdx: {
    subtitle: string
    excerpt: string
  }
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
export const getComputedFields = <T extends string>({
  prefix,
  chopPrefix = true,
}: IComputedFieldsProps): ComputedFields<T> => {
  const cleanPath = chopOffWord(prefix, false)

  return {
    slug: {
      type: "string",
      resolve: (doc) =>
        doc?.givenSlug ?? chopPrefix
          ? cleanPath(doc._raw.flattenedPath).slice(1)
          : doc._raw.flattenedPath,
    },

    computed: {
      type: "json",
      resolve: async (doc) => {
        const tags = [...new Set((doc?.tags ?? []) as string[])].sort()

        // use same package as rehypeSlug so toc and sluggified headings match
        // https://github.com/rehypejs/rehype-slug/blob/main/package.json#L36
        const slugs = new Slugger()
        const regexHeadings = /^(?<tag>#{1,6})[ ](?<content>[^\n]+)/gm

        const headings = !doc?.body?.raw
          ? []
          : [...doc.body.raw.matchAll(regexHeadings)].map(([, tag, content]) => ({
              level: (tag as string).length,
              content: content as string,
              id: slugs.slug(content, false),
            }))

        const { code: mdxSubtitle } = await bundleMDX({
          source: doc.subtitle ?? "",
          mdxOptions(options) {
            options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkSimpleEmoji]
            options.rehypePlugins = [...(options.rehypePlugins ?? [])]
            return options
          },
        })

        const { code: mdxExcerpt } = await bundleMDX({
          source: doc.body.raw ?? "",
          mdxOptions(options) {
            options.remarkPlugins = [
              ...(options.remarkPlugins ?? []),
              remarkSetExcerpt,
              remarkSimpleEmoji,
              remarkGfm,
            ]
            options.rehypePlugins = [...(options.rehypePlugins ?? [])]
            return options
          },
        })

        return {
          frontmatter: {
            title: doc.title,
            subtitle: doc.subtitle,
            // chop of tz info since it's wrong (Z)
            planted: doc.planted?.slice(0, -1) ?? "",
            tended: doc.tended.slice(0, -1),
          },
          tags,
          mdx: {
            subtitle: mdxSubtitle,
            excerpt: mdxExcerpt,
          },
          headings,
        } satisfies Computed
      },
    },
  }
}
