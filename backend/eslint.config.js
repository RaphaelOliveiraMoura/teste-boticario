// @ts-check

const eslint = require("@eslint/js");
const importPlugin = require("eslint-plugin-import");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
const tseslint = require("typescript-eslint");

module.exports = tseslint.config(
  {
    plugins: {
      import: { rules: importPlugin.rules },
    },
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  eslintPluginPrettierRecommended,
);
