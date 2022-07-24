import { GatsbyConfig } from "gatsby";
import { capitalize } from "./src/utils/string";

const plugins: GatsbyConfig["plugins"] = [
  {
    resolve: `gatsby-plugin-root-import`,
    options: {
      resolveModules: [`.`],
    },
  },
  `gatsby-plugin-image`,
  `gatsby-transformer-sharp`,
  {
    resolve: `gatsby-plugin-sharp`,
    options: {
      stripMetadata: true,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `data`,
      path: `data`,
    },
  },
  {
    resolve: `gatsby-transformer-yaml`,
    options: {
      // @ts-ignore
      typeName: ({ node }) => `data${capitalize(node.name, `-`, ``)}`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `writing`,
      path: `content/writing`,
    },
  },
  {
    resolve: `gatsby-plugin-mdx`,
    options: {
      extensions: [`.mdx`, `.md`],
      gatsbyRemarkPlugins: [
        {
          resolve: `gatsby-remark-prismjs`,
          options: {
            classPrefix: `language-`,
            inlineCodeMarker: `›`,
            aliases: {},
            showLineNumbers: false,
          },
        },
        {
          resolve: `gatsby-remark-images`,
          options: {
            maxWidth: 1325,
            quality: 90,
            linkImagesToOriginal: true,
          },
        },
      ],
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
