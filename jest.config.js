module.exports = {
  preset: `ts-jest`,
  verbose: true,
  globals: {
    __PATH_PREFIX__: ``,
    __BASE_PATH__: ``,
    "ts-jest": {
      diagnostics: {
        ignoreCodes: [2322],
      },
    },
  },
  transform: {
    "^.+\\.[jt]sx?$": `<rootDir>/jest/jest-preprocess.js`,
  },
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  setupFiles: [`<rootDir>/jest/jest-setup.js`],
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.js`,
    "^gatsby-page-utils/(.*)$": `gatsby-page-utils/dist/$1`, // Workaround for https://github.com/facebook/jest/issues/9771
    "^gatsby-core-utils/(.*)$": `gatsby-core-utils/dist/$1`, // Workaround for https://github.com/facebook/jest/issues/9771
    "^gatsby-plugin-utils/(.*)$": [`gatsby-plugin-utils/dist/$1`, `gatsby-plugin-utils/$1`], // Workaround for https://github.com/facebook/jest/issues/9771
    "^@reach/router(.*)": `<rootDir>/node_modules/@gatsbyjs/reach-router$1`,
  },
};
