import { defineDocumentType } from "contentlayer/source-files";
import { getFields, getComputedFields } from "../fields";

const fields = getFields({
  subtitle: `Doing my best ✍️`,
});
const computedFields = getComputedFields({
  prefix: `pages`,
});

export const Page = defineDocumentType(() => ({
  name: `Page`,
  contentType: `mdx`,
  filePathPattern: `pages/**/*.md`,
  fields,
  computedFields,
}));
