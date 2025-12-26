import js from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  {
    ignores: ["dist/**", "node_modules/**", "modules/**"],
  },
  {
    ignores: [
      ".astro/**",
      "**/*.astro",
      // This is key as <script>s in Astro files are assigned a virtual filename
      // Source: <https://github.com/withastro/prettier-plugin-astro/issues/407#issuecomment-2498306376>
      "**/*.astro/*.js",
      "**/*.astro/*.ts",
    ],
    ...js.configs.recommended,
    ...eslintPluginPrettierRecommended,
  },
  ...eslintPluginAstro.configs["flat/recommended"],
  ...eslintPluginAstro.configs["flat/jsx-a11y-recommended"],
  {
    rules: {
      "astro/semi": "error",
    },
  },
];
