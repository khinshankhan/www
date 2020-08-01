module.exports = [
  "gatsby-plugin-root-import",
  {
    resolve: `gatsby-plugin-material-ui`,
    options: {
      stylesProvider: {
        injectFirst: true,
      },
    },
  },
];
