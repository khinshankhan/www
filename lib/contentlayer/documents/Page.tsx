import { defineDocumentType } from "contentlayer/source-files";
import { fields, getComputedFields } from "../utils";

const computedFields = getComputedFields<"Page">({
  prefix: `page`,
  subtitle: `Doing my best ✍️`,
});

export const Page = defineDocumentType(() => ({
  name: `Page`,
  contentType: `mdx`,
  filePathPattern: `page/**/*.md`,
  fields,
  computedFields,
}));
