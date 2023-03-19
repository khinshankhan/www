import { defineDocumentType } from "contentlayer/source-files"

import { getComputedFields, getFields } from "./utils"

const fields = getFields({
  subtitle: "A little surprise reading :writing_hand:",
})
const computedFields = getComputedFields<"Writing">({
  prefix: "writings",
  chopPrefix: false,
})

export const Writing = defineDocumentType(() => ({
  name: "Writing",
  contentType: "mdx",
  filePathPattern: "writings/**/*.md",
  fields: {
    ...fields,

    planted: {
      type: "date",
      required: true,
    },

    tags: {
      type: "list",
      of: {
        type: "string",
      },
      required: true,
    },
  },
  computedFields,
}))
