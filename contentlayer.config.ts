import { makeSource } from "contentlayer/source-files";
import * as documentTypes from "./lib/contentlayer";

export default makeSource({
  contentDirPath: `content`,
  documentTypes,
});
