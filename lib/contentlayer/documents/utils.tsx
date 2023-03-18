import type { ComputedFields, FieldDefs } from "contentlayer/source-files"

import { chopOffWord } from "../../utils"

interface IFieldsProps {
  subtitle: string
  status?: "draft" | "published"
}
export const getFields = ({ subtitle, status = "published" }: IFieldsProps): FieldDefs => ({
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
      resolve: (doc) => {
        const tags = [...new Set((doc?.tags ?? []) as string[])].sort()

        return {
          frontmatter: {
            title: doc.title,
            subtitle: doc.subtitle,
            // chop of tz info since it's wrong (Z)
            planted: doc.planted?.slice(0, -1) ?? "",
            tended: doc.tended.slice(0, -1),
          },
          tags,
        } satisfies Computed
      },
    },
  }
}
