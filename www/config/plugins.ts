import { GatsbyConfig } from "gatsby";

export const plugins: GatsbyConfig["plugins"] = [
  `gatsby-plugin-root-import`,
  `@chakra-ui/gatsby-plugin`,
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      start_url: `/`,
      icon: `src/assets/logo.svg`,
      cache_busting_mode: `none`,
    },
  },
  {
    resolve: `gatsby-omni-font-loader`,
    options: {
      enableListener: true,
      preconnect: [`https://fonts.gstatic.com`],
      interval: 300,
      timeout: 30000,
      web: [
        {
          name: `Inter`,
          file: `https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap`,
        },
        {
          name: `Crimson Pro`,
          file: `https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400..700&display=swap`,
        },
        {
          name: `Crimson Text`,
          file: `https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400..700&display=swap`,
        },
      ],
    },
  },
  `@anchorage/gatsby-plugin-mdx-slug-name`,
  `@anchorage/gatsby-plugin-mdx-source-name`,
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
      lessBabel: true,
      extensions: [`.mdx`, `.md`],
    },
  },
];
