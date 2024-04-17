import js from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  ...eslintPluginAstro.configs["flat/recommended"],
  ...eslintPluginAstro.configs["flat/jsx-a11y-recommended"],
  {
    rules: {
      "astro/semi": "error",
    },
  },
  {
    ignores: [".astro/**", "**/*.astro"],
    ...js.configs.recommended,
    ...eslintPluginPrettierRecommended,
  },
];
