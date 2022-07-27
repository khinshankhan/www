module.exports = {
  parser: `@typescript-eslint/parser`, // Specifies the ESLint parser
  plugins: [`@typescript-eslint`, `prettier`, `react-hooks`, `graphql`, `jsx-a11y`],
  extends: [`airbnb`, `plugin:prettier/recommended`, `plugin:jsx-a11y/recommended`],
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
    // https://eslint.org/docs/rules/
    import: `off`,
    "import/export": `error`,
    "import/extensions": `off`, // no point
    "import/first": `error`,
    "import/exports-last": `off`, // it's okay to export types beforehand
    "import/named": `off`, // ts will check for us anyways
    "import/newline-after-import": `error`,
    "import/no-anonymous-default-export": `error`,
    // 'trust me' -- said no one ever, occasionally toggle this on to check but
    // it's super expensive to run to by default it'll be off
    "import/no-cycle": `error`,
    "import/no-duplicates": `error`,
    "import/no-extraneous-dependencies": `error`,
    "import/no-self-import": `error`,
    "import/no-unresolved": `off`, // ts will check for us anyways
    "import/no-unused-modules": [
      `error`,
      // TODO: set unusedExports to true to clean up old code
      { missingExports: true, unusedExports: false },
    ],
    "import/no-useless-path-segments": [
      `error`,
      {
        noUselessIndex: true,
      },
    ],
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
    "import/prefer-default-export": `off`,

    "arrow-body-style": [`error`, `as-needed`],
    "consistent-return": `error`,
    "func-names": `off`,
    indent: [`error`, 2, { SwitchCase: 1 }],
    "linebreak-style": `off`,
    "no-console": [`warn`, { allow: [`warn`, `error`] }],
    "no-continue": `off`,
    "no-param-reassign": [
      `error`,
      {
        props: false,
      },
    ],
    "no-plusplus": `off`,
    // allow for default for airbnb's rules
    // https://github.com/airbnb/javascript/blob/7fdc87a8be565fa1f1779dc1d6b6461b953f7d85/packages/eslint-config-airbnb-base/rules/es6.js#L63-L70
    "no-restricted-exports": [
      `error`,
      {
        restrictedNamedExports: [
          `then`, // this will cause tons of confusion when your module is dynamically `import()`ed, and will break in most node ESM versions
        ],
      },
    ],
    "no-underscore-dangle": [
      `error`,
      {
        allow: [`_active`, `_dark`],
      },
    ],
    "no-unused-expressions": [
      `warn`,
      {
        allowTaggedTemplates: true,
      },
    ],
    "prettier/prettier": [
      `error`,
      {
        trailingComma: `es5`,
        semi: true,
        singleQuote: false,
        printWidth: 100,
      },
    ],
    "space-before-function-paren": `error`,
    "spaced-comment": [`error`, `always`, { exceptions: [`-`, `+`], markers: [`/`] }],

    // https://typescript-eslint.io/rules/
    "@typescript-eslint/ban-ts-comment": `off`,
    // DEPRECATED: in favor of naming-convention
    camelcase: `off`,
    "@typescript-eslint/camelcase": `off`,
    "@typescript-eslint/explicit-function-return-type": `off`,
    "@typescript-eslint/explicit-module-boundary-types": `off`,
    "@typescript-eslint/prefer-interface": `off`,
    quotes: `off`,
    "@typescript-eslint/quotes": [
      `error`,
      `backtick`,
      {
        avoidEscape: true,
      },
    ],
    "@typescript-eslint/no-empty-function": `off`,
    "no-loop-func": `off`,
    "@typescript-eslint/no-loop-func": [`error`],
    "no-loss-of-precision": `off`,
    "@typescript-eslint/no-loss-of-precision": [`error`],
    "no-magic-numbers": `off`,
    // TODO: toggle this on after looking into how to avoid triggering rule on
    // default args
    "@typescript-eslint/no-magic-numbers": `off`,
    "@typescript-eslint/no-non-null-assertion": `off`,
    "no-use-before-define": `off`,
    "@typescript-eslint/no-use-before-define": `error`,
    "@typescript-eslint/no-unused-vars": [
      `warn`,
      {
        argsIgnorePattern: `res|next|stage|^err|on|config|e|_`,
      },
    ],
    "@typescript-eslint/no-var-requires": `error`,
    "object-curly-spacing": `off`,
    // TODO: look into prettier support as well
    "@typescript-eslint/object-curly-spacing": [`off`],
    "@typescript-eslint/type-annotation-spacing": `error`,
    "@typescript-eslint/unified-signatures": `warn`,

    // https://github.com/jsx-eslint/eslint-plugin-react
    "react/boolean-prop-naming": [
      `error`,
      { rule: `^(is|has|to)[A-Z]([A-Za-z0-9]?)+`, validateNested: true },
    ],
    // NOTE: could be helpful... will keep this in the back of mind while coding
    // but officially it'll be off
    "react/display-name": `off`,
    "react/forbid-prop-types": `off`,
    "react/function-component-definition": [
      `warn`,
      {
        namedComponents: `arrow-function`,
        unnamedComponents: `arrow-function`,
      },
    ],
    "react/jsx-curly-brace-presence": `off`,
    "react/jsx-filename-extension": [
      `warn`,
      {
        extensions: [`.js`, `.jsx`, `.tsx`],
      },
    ],
    "react/jsx-fragments": `off`,
    // TODO: soo waiting to try this out when it releases
    // "react/jsx-no-leaked-render": `warn`,
    "react/jsx-one-expression-per-line": `off`,
    "react/jsx-pascal-case": [
      `warn`,
      {
        allowNamespace: true,
      },
    ],
    "react/jsx-props-no-spreading": `off`,
    "react/jsx-uses-react": `warn`,
    "react/no-danger": `off`, // kind of the point of a blog...
    "react/no-unescaped-entities": `warn`,
    "react/prop-types": `off`,
    "react/react-in-jsx-scope": `off`,
    "react/require-default-props": `off`,

    "react-hooks/exhaustive-deps": `warn`,
    "react-hooks/rules-of-hooks": `error`,

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
    "jsx-a11y/href-no-hash": `off`,
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
    // "jsx-a11y/label-has-for": `warn`, was deprecated and replaced with
    // jsx-a11y/has-associated-control in v6.1.0
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
  },
  overrides: [
    {
      // Config-related files
      files: [`**eslint*.js`, `**lint-staged*.js`, `**jest*.js`],
      rules: {
        "import/no-unused-modules": `off`,
        "@typescript-eslint/no-magic-numbers": `off`,
        "@typescript-eslint/no-var-requires": `off`,
      },
    },
    {
      // Gatbsy config files
      files: [`**gatsby-*.tsx`],
      rules: {
        "import/no-unused-modules": `off`,
        "import/prefer-default-export": `off`,
      },
    },
    {
      // Testing-related files
      files: [`**/__tests__/**/*`, `**/__mocks__/**/*`, `**.test.*`],
      rules: {
        "import/no-unused-modules": `off`,
        "@typescript-eslint/no-var-requires": `off`,
      },
    },
    {
      // Barrel files
      files: [`**index.ts`],
      rules: {
        // TODO: come back to this
        "import/no-unused-modules": `off`,
        "import/prefer-default-export": `off`,
      },
    },
    {
      // Typescript project files only
      files: [`*.ts`, `*.tsx`],
      rules: {
        "@typescript-eslint/no-unnecessary-condition": [
          `error`,
          {
            allowConstantLoopConditions: false,
            allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: true,
          },
        ],
        "@typescript-eslint/prefer-includes": `warn`,
        "@typescript-eslint/prefer-nullish-coalescing": [
          `warn`,
          {
            ignoreConditionalTests: true,
            ignoreMixedLogicalExpressions: true,
          },
        ],
        "@typescript-eslint/prefer-optional-chain": `warn`,
        "@typescript-eslint/prefer-reduce-type-parameter": `warn`,
        "@typescript-eslint/prefer-string-starts-ends-with": `warn`,
        "@typescript-eslint/promise-function-async": `error`,
        // TODO: waiting for https://github.com/jsx-eslint/eslint-plugin-react/issues/3286
        // before adding in `destructureInSignature`
        "react/destructuring-assignment": [`warn`, `always`, { ignoreClassFields: false }],
      },
      parserOptions: {
        project: [`./tsconfig.json`], // Specify it only for TypeScript files
      },
      // TODO: get back to this rule after reading up on it
      // extends: [`plugin:@typescript-eslint/recommended-requiring-type-checking`],
    },
  ],
};
