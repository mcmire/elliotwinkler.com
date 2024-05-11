//const baseFontSize = 14;
const fontSize = [
  "xs",
  "sm",
  "base",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
].reduce((obj, key, i) => {
  // Possible ideas:
  //   y = 14 * 1.125^x
  //   y = 14 * 1.1^(9x/8)
  //   y = x^1.4 + 14
  //   y = 0.75 * sqrt(x) * x^1.05 + 14   <-- the winner
  //const thisFontSize = Math.sqrt(i) * 0.75 * Math.pow(i, 1.05) + baseFontSize;
  const thisFontSize = Math.pow(i + 5, 2) / 10 + 13.5;

  /*
  if (key === "lg") {
    return {
      ...obj,
      [key]: ["1.3rem", "1.75rem"],
    };
  */

  return {
    ...obj,
    [key]: [`${thisFontSize}px`, `${thisFontSize * 1.7}px`],
  };
}, {});

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontSize,
    extend: {
      fontFamily: {
        sans: ["Figtree Variable"],
        mono: ["IBM Plex Mono"],
        display: ["Figtree Variable"],
      },
    },
  },
  plugins: [],
};
