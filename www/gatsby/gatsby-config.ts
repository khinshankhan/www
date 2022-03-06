import path from "path";
import { GatsbyConfig } from "gatsby";

const baseDir = path.join(__dirname, `..`);

const plugins: GatsbyConfig["plugins"] = [
  {
    resolve: `gatsby-plugin-root-import`,
    options: {
      resolveModules: [baseDir],
    },
  },
  {
    resolve: `@chakra-ui/gatsby-plugin`,
    options: {
      resetCSS: true,
      portalZIndex: 40,
    },
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      start_url: `/`,
      icon: `src/assets/logo.svg`,
      cache_busting_mode: `none`,
    },
  },
];

const config: GatsbyConfig = {
  trailingSlash: `never`,
  plugins,
};

export default config;
