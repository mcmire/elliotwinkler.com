module.exports = {
  presets: [["@babel/preset-env", { useBuiltIns: "usage", corejs: "3.22" }]],
  plugins: [
    "lodash",
    [
      "prismjs",
      {
        // https://prismjs.com/index.html#supported-languages
        languages: ["bash", "css", "html", "js", "jsx", "ruby"],
        plugins: [], //,
        //theme: "solarizedlight",
        //css: true
      },
    ],
  ],
};
