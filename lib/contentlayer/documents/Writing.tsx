import { defineDocumentType } from "contentlayer/source-files";
import { getFields, getComputedFields } from "../utils";

const fields = getFields({
  subtitle: `A little surprise reading 😊`,
});
const computedFields = getComputedFields<"Writing">({
  prefix: `writing`,
  chopPrefix: false,
});

export const Writing = defineDocumentType(() => ({
  name: `Writing`,
  contentType: `mdx`,
  filePathPattern: `writing/**/*.md`,
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
