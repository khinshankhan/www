import { defineDocumentType } from "contentlayer/source-files";
import { getFields, getComputedFields } from "../utils";

const fields = getFields({
  subtitle: `Another fun list 🙃`,
});
const computedFields = getComputedFields<"Contextual">({
  prefix: `contextual`,
});

export const Contextual = defineDocumentType(() => ({
  name: `Contextual`,
  contentType: `mdx`,
  filePathPattern: `contextual/**/*.md`,
  fields,
  computedFields,
}));
