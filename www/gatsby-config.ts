import { GatsbyConfig } from "gatsby";

const plugins: GatsbyConfig["plugins"] = [
  {
    resolve: `gatsby-plugin-root-import`,
    options: {
      resolveModules: [`.`],
    },
  },
  `gatsby-plugin-react-helmet-async`,
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
