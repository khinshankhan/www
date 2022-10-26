import { defineDocumentType } from "contentlayer/source-files";
import { getFields, getComputedFields } from "../utils";

const fields = getFields({
  subtitle: `A little surprise reading 😊`,
});
const computedFields = getComputedFields<"Listed">({
  prefix: `listed`,
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
