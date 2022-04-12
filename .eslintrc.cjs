module.exports = {
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  env: {
    es2021: true,
  },
  overrides: [
    {
      files: [
        ".eslintrc.cjs",
        "astro.config.mjs",
        "stylelint.config.cjs",
        "tailwind.config.cjs",
      ],
      env: {
        node: true,
      },
    },
    {
      files: ["**/*.mjs"],
      parserOptions: {
        sourceType: "module",
      },
    },
  ],
};
