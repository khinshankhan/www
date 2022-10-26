import { defineDocumentType } from "contentlayer/source-files";
import { fields, getComputedFields } from "../utils";

const computedFields = getComputedFields<"Contextual">({
  prefix: `contextual`,
  subtitle: `Another fun list 🙃`,
});

export const Contextual = defineDocumentType(() => ({
  name: `Contextual`,
  contentType: `mdx`,
  filePathPattern: `contextual/**/*.md`,
  fields,
  computedFields,
}));
