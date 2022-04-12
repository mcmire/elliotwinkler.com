const plugin = require("tailwindcss/plugin");

function mapObject(obj, fn) {
  return Object.keys(obj).map((key) => {
    return fn(obj[key], key);
  });
}

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        icon: "Icomoon",
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
