import path from "path";
import { GatsbyConfig } from "gatsby";
import { siteMetadata, plugins as userPlugins } from "../config";

const baseDir = path.join(__dirname, `..`);

const plugins: GatsbyConfig["plugins"] = [
  {
    resolve: `gatsby-plugin-root-import`,
    options: {
      resolveModules: [baseDir],
    },
  },
  ...userPlugins,
];

const config: GatsbyConfig = {
  siteMetadata,
  plugins,
};

export default config;
