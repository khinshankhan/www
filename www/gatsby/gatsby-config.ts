import { GatsbyConfig } from "gatsby";

const plugins: GatsbyConfig["plugins"] = [
  {
    resolve: `@chakra-ui/gatsby-plugin`,
    options: {
      resetCSS: true,
      portalZIndex: 40,
    },
  },
];

const config: GatsbyConfig = {
  plugins,
};

export default config;
