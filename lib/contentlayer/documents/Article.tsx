import { defineDocumentType } from "contentlayer/source-files";
import { fields, getComputedFields } from "../utils";

const computedFields = getComputedFields<"Article">({
  prefix: `articles`,
  subtitle: `A little surprise reading 😊`,
});

export const Article = defineDocumentType(() => ({
  name: `Article`,
  contentType: `mdx`,
  filePathPattern: `articles/**/*.md`,
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
