import { makeSource } from "contentlayer/source-files";
import * as documentTypes from "./lib/contentlayer/documents";

export default makeSource({
  contentDirPath: `data`,
  documentTypes,
});
