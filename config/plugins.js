module.exports = [
  "gatsby-plugin-root-import",
  {
    resolve: "gatsby-plugin-material-ui",
    options: {
      stylesProvider: {
        injectFirst: true,
      },
    },
  },
  {
    resolve: "gatsby-source-filesystem",
    options: {
      name: "assets",
      path: `${__dirname}/../src/assets`,
    },
  },
  {
    resolve: "gatsby-plugin-manifest",
    options: {
      start_url: "/",
      icon: "src/assets/logo.svg",
      cache_busting_mode: "none",
    },
  },
  {
    resolve: "gatsby-plugin-offline",
    options: {
      workboxConfig: {
        globPatterns: ["**/icon-path*"],
      },
    },
  },
];
