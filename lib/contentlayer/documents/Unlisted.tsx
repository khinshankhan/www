import { defineDocumentType } from "contentlayer/source-files";
import { fields, getComputedFields } from "../utils";

const computedFields = getComputedFields<"Unlisted">({
  prefix: `unlisted`,
  subtitle: `A little surprise reading 😊`,
});

export const Unlisted = defineDocumentType(() => ({
  name: `Unlisted`,
  contentType: `mdx`,
  filePathPattern: `unlisted/**/*.md`,
  fields: {
    ...fields,

    planted: {
      type: `date`,
      required: true,
    },

    tags: {
      type: `list`,
      of: {
        type: `string`,
      },
      required: true,
    },
  },
  computedFields,
}));
