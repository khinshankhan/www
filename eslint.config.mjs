import eslintConfigPrettier from "eslint-config-prettier"
import jsxA11y from "eslint-plugin-jsx-a11y"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import { defineConfig } from "eslint/config"
import globals from "globals"
import tseslint from "typescript-eslint"
import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"

const tsconfigRootDir = new URL(".", import.meta.url).pathname
const compat = new FlatCompat({ baseDirectory: tsconfigRootDir })

export default defineConfig([
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "coverage/**",
      "next-env.d.ts",
      "eslint.config.*",
    ],
  },

  ...compat.extends("plugin:@next/next/core-web-vitals"),

  js.configs.recommended,

  ...tseslint.configs.strictTypeChecked.map((c) => ({
    ...c,
    files: ["**/*.ts", "**/*.tsx"],
  })),
  ...tseslint.configs.stylisticTypeChecked.map((c) => ({
    ...c,
    files: ["**/*.ts", "**/*.tsx"],
  })),
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir,
      },
    },
  },

  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      "jsx-a11y/alt-text": "warn",

      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: false,
        },
      ],
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/restrict-template-expressions": ["warn", { allowNumber: true }],
    },
  },

  eslintConfigPrettier,
])
