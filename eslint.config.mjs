import eslintConfigPrettier from "eslint-config-prettier"
import jsxA11y from "eslint-plugin-jsx-a11y"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import { defineConfig } from "eslint/config"
import globals from "globals"
import tseslint from "typescript-eslint"
import js from "@eslint/js"
import nextPlugin from "@next/eslint-plugin-next"

const tsconfigRootDir = new URL(".", import.meta.url).pathname

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

  nextPlugin.configs["core-web-vitals"],

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
    files: ["**/*.{ts,tsx,js,jsx,mjs}"],
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

      "@next/next/no-img-element": "off",
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
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

  // quicksilver layer boundaries: css < lib < hooks < headless < primitives < patterns < embeds.
  // a layer may only import from layers below it.
  {
    files: ["quicksilver/lib/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/quicksilver/hooks/*", "@/quicksilver/react/*"],
              message: "quicksilver/lib is framework-free; it must not import hooks or react/.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["quicksilver/hooks/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/quicksilver/react/*"],
              message: "quicksilver/hooks sits below react/; it must not import from it.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["quicksilver/react/headless/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@/quicksilver/react/primitives/*",
                "@/quicksilver/react/patterns/*",
                "@/quicksilver/react/embeds/*",
              ],
              message: "headless sits below primitives, patterns, and embeds.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["quicksilver/react/primitives/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/quicksilver/react/patterns/*", "@/quicksilver/react/embeds/*"],
              message: "primitives sit below patterns and embeds.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["quicksilver/react/patterns/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/quicksilver/react/embeds/*"],
              message: "patterns sit below embeds.",
            },
          ],
        },
      ],
    },
  },

  eslintConfigPrettier,
])
