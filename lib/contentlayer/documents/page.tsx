import { defineDocumentType } from "contentlayer/source-files"

import { getComputedFields, getFields } from "./utils"

const fields = getFields({
  subtitle: "Doing my best :writing_hand:",
})
const computedFields = getComputedFields<"RootPage">({
  prefix: "pages",
})

export const Page = defineDocumentType(() => ({
  name: "RootPage",
  contentType: "mdx",
  filePathPattern: "pages/**/*.md",
  fields,
  computedFields,
}))
