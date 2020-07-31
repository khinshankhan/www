module.exports = {
  plugins: [
    "gatsby-plugin-root-import",
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    `custom-mui-theme`,
  ],
};
