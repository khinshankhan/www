module.exports = {
  parser: `@typescript-eslint/parser`, // Specifies the ESLint parser
  extends: [`airbnb`, `plugin:prettier/recommended`],
  plugins: [`@typescript-eslint`, `prettier`, `react-hooks`, `graphql`],
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
    graphql: true,
  },
  settings: {
    "import/internal-regex": `^anchorage/`,
  },
  rules: {
    "@typescript-eslint/no-unused-vars": [
      1,
      {
        argsIgnorePattern: `res|next|stage|^err|on|config|e|_`,
      },
    ],
    "arrow-body-style": [2, `as-needed`],
    "no-param-reassign": [
      2,
      {
        props: false,
      },
    ],
    "no-unused-expressions": [
      1,
      {
        allowTaggedTemplates: true,
      },
    ],
    quotes: `off`,
    "@typescript-eslint/quotes": [
      2,
      `backtick`,
      {
        avoidEscape: true,
      },
    ],
    "@typescript-eslint/prefer-interface": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-use-before-define": 0,
    "@typescript-eslint/camelcase": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/ban-ts-comment": 0,
    "no-console": [`warn`, { allow: [`warn`] }],
    "spaced-comment": [2, `always`, { exceptions: [`-`, `+`], markers: [`/`] }],
    "no-use-before-define": 0,
    "no-plusplus": 0,
    "no-continue": 0,
    "linebreak-style": 0,
    "consistent-return": 0,
    import: 0,
    camelcase: 1,
    "import/no-unresolved": 0,
    "func-names": 0,
    "import/no-extraneous-dependencies": 0,
    "import/prefer-default-export": 0,
    "import/no-cycle": 0,
    "space-before-function-paren": 0,
    "import/extensions": 0,
    "import/no-anonymous-default-export": 2,
    "react/function-component-definition": [
      `warn`,
      {
        namedComponents: `arrow-function`,
        unnamedComponents: `arrow-function`,
      },
    ],
    "react/jsx-one-expression-per-line": 0,
    "react/no-danger": 0,
    "react/display-name": 0,
    "react/react-in-jsx-scope": 0,
    "react/jsx-uses-react": 1,
    "react/require-default-props": 0,
    "react/forbid-prop-types": 0,
    "react/no-unescaped-entities": 0,
    "react/prop-types": 0,
    "react/jsx-props-no-spreading": 0,
    "react/jsx-fragments": 0,
    "react/jsx-curly-brace-presence": 0,
    "react/jsx-pascal-case": [
      `warn`,
      {
        allowNamespace: true,
      },
    ],
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [`.js`, `.jsx`, `.tsx`],
      },
    ],
    "react-hooks/rules-of-hooks": `error`,
    "react-hooks/exhaustive-deps": `warn`,
    indent: [`error`, 2, { SwitchCase: 1 }],
    "prettier/prettier": [
      `error`,
      {
        trailingComma: `es5`,
        semi: true,
        singleQuote: false,
        printWidth: 100,
      },
    ],
    // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/master/docs/rules
    // "jsx-a11y/accessible-emoji": `warn`, Deprecated
    "jsx-a11y/alt-text": `warn`,
    "jsx-a11y/anchor-has-content": `warn`,
    "jsx-a11y/anchor-is-valid": `warn`,
    "jsx-a11y/aria-activedescendant-has-tabindex": `warn`,
    "jsx-a11y/aria-props": `warn`,
    "jsx-a11y/aria-proptypes": `warn`,
    "jsx-a11y/aria-role": `warn`,
    "jsx-a11y/aria-unsupported-elements": `warn`,
    "jsx-a11y/autocomplete-valid": [
      `warn`,
      {
        inputComponents: [],
      },
    ],
    "jsx-a11y/click-events-have-key-events": `warn`,
    "jsx-a11y/control-has-associated-label": [
      `warn`,
      {
        ignoreElements: [`audio`, `canvas`, `embed`, `input`, `textarea`, `tr`, `video`],
        ignoreRoles: [
          `grid`,
          `listbox`,
          `menu`,
          `menubar`,
          `radiogroup`,
          `row`,
          `tablist`,
          `toolbar`,
          `tree`,
          `treegrid`,
        ],
        includeRoles: [`alert`, `dialog`],
      },
    ],
    "jsx-a11y/heading-has-content": `warn`,
    "jsx-a11y/html-has-lang": `warn`,
    "jsx-a11y/iframe-has-title": `warn`,
    "jsx-a11y/img-redundant-alt": `warn`,
    "jsx-a11y/interactive-supports-focus": [
      `warn`,
      {
        tabbable: [
          `button`,
          `checkbox`,
          `link`,
          `progressbar`,
          `searchbox`,
          `slider`,
          `spinbutton`,
          `switch`,
          `textbox`,
        ],
      },
    ],
    // "jsx-a11y/label-has-for": `warn`, was deprecated and replaced with jsx-a11y/has-associated-control in v6.1.0
    "jsx-a11y/label-has-associated-control": `warn`,
    "jsx-a11y/lang": `warn`,
    "jsx-a11y/media-has-caption": `warn`,
    "jsx-a11y/mouse-events-have-key-events": `warn`,
    "jsx-a11y/no-access-key": `warn`,
    "jsx-a11y/no-autofocus": `warn`,
    "jsx-a11y/no-distracting-elements": `warn`,
    "jsx-a11y/no-interactive-element-to-noninteractive-role": `warn`,
    "jsx-a11y/no-noninteractive-element-interactions": [
      `warn`,
      {
        body: [`onError`, `onLoad`],
        iframe: [`onError`, `onLoad`],
        img: [`onError`, `onLoad`],
      },
    ],
    "jsx-a11y/no-noninteractive-element-to-interactive-role": `warn`,
    "jsx-a11y/no-noninteractive-tabindex": `warn`,
    // "jsx-a11y/no-onchange": `warn`, Deprecated
    "jsx-a11y/no-redundant-roles": `warn`,
    "jsx-a11y/no-static-element-interactions": `warn`,
    "jsx-a11y/role-has-required-aria-props": `warn`,
    "jsx-a11y/role-supports-aria-props": `warn`,
    "jsx-a11y/scope": `warn`,
    "jsx-a11y/tabindex-no-positive": `warn`,
    "jsx-a11y/href-no-hash": `off`,
    "import/order": [
      `warn`,
      {
        groups: [`builtin`, `external`, `internal`],
        pathGroups: [
          {
            pattern: `react`,
            group: `external`,
            position: `before`,
          },
        ],
        pathGroupsExcludedImportTypes: [`react`],
        "newlines-between": `never`,
        alphabetize: {
          order: `asc`,
          caseInsensitive: true,
        },
      },
    ],
  },
};
