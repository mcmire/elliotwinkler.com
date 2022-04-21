const postcssImport = require("postcss-import");
const tailwindNesting = require("tailwindcss/nesting");
const tailwind = require("tailwindcss");
const autoprefixer = require("autoprefixer");

module.exports = {
  plugins: [
    postcssImport({
      addModulesDirectories: ["../personal-content--writings"],
    }),
    // For some reason postcss-nested doesn't work here, oh well
    tailwindNesting,
    tailwind,
    autoprefixer,
  ],
};
