import { GatsbyBrowser } from "gatsby";
import { RootWrapper } from "src/wrappers";

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = RootWrapper;
