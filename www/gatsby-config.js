// Since the order gatsby reads configs is
// gatsby-config -> gatsby-node -> gatsby-ssr -> gatsby-browser
// we only need to register the typescript evaluator here
require(`ts-node`).register({ transpileOnly: true, files: true });

module.exports = require(`./gatsby/gatsby-config.ts`);
