const plugin = require("tailwindcss/plugin");

function mapObject(obj, fn) {
  return Object.keys(obj).map((key) => {
    return fn(obj[key], key);
  });
}

module.exports = {
  content: [
    "./assets/**/*.css",
    "./source/**/*.haml",
    "../personal-content--writings/**/*.md",
    "../personal-content--writings/**/*.erb",
    "../personal-content--writings/**/*.css",
  ],
  theme: {
    screens: {
      bp1: "500px",
      bp2: "750px",
      bp3: "800px",
      bp4: "900px",
      bp5: "1000px",
    },
    extend: {
      fontFamily: {
        serif: "Georgia",
        icon: "Icomoon",
      },
      fontSize: {
        md: "1.1rem",
        "inherit-font-size": "inherit",
      },
      maxWidth: {
        "3xs": "10rem",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities, theme, e }) => {
      const rotateUtilities = mapObject(theme("rotate"), (value, key) => {
        return {
          [`.${e(`rotate-y-${key}`)}`]: {
            transform: `rotateY(${value})`,
          },
          [`.${e(`-rotate-y-${key}`)}`]: {
            transform: `rotateY(-${value})`,
          },
        };
      });

      addUtilities(rotateUtilities, { variants: ["hover", "group-hover"] });
    }),
  ],
};
