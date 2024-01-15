const m = (s) => `^(@/)?(${s}/(.*)$)|^(@/)?(${s}$)`

/** @type {import('prettier').Config} */
module.exports = {
  arrowParens: "always",
  printWidth: 100,
  endOfLine: "lf",
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.3.3",
  importOrder: [
    "", // gap at the top after top-of-file-comments
    "<BUILTIN_MODULES>",
    m("react"),
    m("next"),
    "<THIRD_PARTY_MODULES>",
    m("types"),
    m("config"),
    m("constants"),
    m("lib/theme"),
    m("lib"),
    m("stores"),
    m("hooks"),
    m("styles"),
    m("@radix-ui"),
    m("components/ui"),
    m("components"),
    "^[./]",
  ],
}
