import { defineDocumentType } from "contentlayer/source-files";
import { getFields, getComputedFields } from "../utils";

const fields = getFields({
  subtitle: `A little surprise reading 😊`,
});
const computedFields = getComputedFields<"Project">({
  prefix: `project`,
  chopPrefix: false,
});

export const Project = defineDocumentType(() => ({
  name: `Project`,
  contentType: `mdx`,
  filePathPattern: `project/**/*.md`,
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
