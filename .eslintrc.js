module.exports = {
  parser: `@typescript-eslint/parser`, // Specifies the ESLint parser
  plugins: [`@typescript-eslint`, `import`, `prettier`, `react-hooks`, `jsx-a11y`],
  extends: [
    `airbnb`,
    `plugin:import/recommended`,
    `plugin:import/typescript`,
    `plugin:prettier/recommended`,
    `plugin:jsx-a11y/recommended`,
    `next`,
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: `module`, // Allows for the use of imports
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    jest: true,
    node: true,
  },
  globals: {
    cy: true,
    Cypress: true,
    JSX: true,
  },
  settings: {
    "import/internal-regex": `^anchorage/`,
  },
};
