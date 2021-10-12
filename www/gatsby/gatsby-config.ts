import { GatsbyConfig } from "gatsby";
import { plugins as userPlugins, siteMetadata } from "../config";

const plugins: GatsbyConfig["plugins"] = [...userPlugins];

const config: GatsbyConfig = {
  siteMetadata,
  plugins,
};

export default config;
