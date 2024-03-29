module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
    "jest/globals": true,
  },
  plugins: ["jest", "prettier", "react-hooks"],
  extends: ["eslint:recommended", "plugin:prettier/recommended", "next/core-web-vitals"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  globals: {
    JSX: "readonly",
  },
  rules: {
    "no-console": ["warn", { allow: ["error"] }],
    "no-trailing-spaces": ["warn", {}],
    "react-hooks/rules-of-hooks": `error`,
    "react-hooks/exhaustive-deps": `warn`,
  },
}
