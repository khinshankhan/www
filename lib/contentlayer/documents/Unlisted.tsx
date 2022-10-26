import { defineDocumentType } from "contentlayer/source-files";
import { getFields, getComputedFields } from "../utils";

const fields = getFields({
  subtitle: `A little surprise reading 😊`,
});
const computedFields = getComputedFields<"Unlisted">({
  prefix: `unlisted`,
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
