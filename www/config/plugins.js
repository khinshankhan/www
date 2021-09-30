module.exports = [
  `gatsby-plugin-root-import`,
  `@chakra-ui/gatsby-plugin`,
  {
    resolve: `gatsby-omni-font-loader`,
    options: {
      enableListener: true,
      preconnect: [`https://fonts.gstatic.com`],
      interval: 300,
      timeout: 30000,
      web: [
        {
          name: `Crimson Pro`,
          file: `https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400..700&display=swap`,
        },
        {
          name: `Montserrat`,
          file: `https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap`,
        },
        // NOTE: unused for now, but it'll be cool for later
        {
          name: `Comic Neue`,
          file: `https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap`,
        },
      ],
    },
  },
];
