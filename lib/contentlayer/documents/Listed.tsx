import { defineDocumentType } from "contentlayer/source-files";
import { fields, getComputedFields } from "../utils";

const computedFields = getComputedFields<"Listed">({
  prefix: `listed`,
  subtitle: `A little surprise reading 😊`,
});

export const Listed = defineDocumentType(() => ({
  name: `Listed`,
  contentType: `mdx`,
  filePathPattern: `listed/**/*.md`,
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
