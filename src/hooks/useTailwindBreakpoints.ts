import throttle from "throttleit";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config.mjs"; // Fix the path
import { createSignal, onCleanup, onMount } from "solid-js";

const fullConfig = resolveConfig(tailwindConfig);
const screens = fullConfig.theme.screens;
type Screens = typeof screens;
type Breakpoints = { [K in keyof Screens]: number };
const breakpoints = Object.entries(screens).reduce<Breakpoints>(
  (obj, [name, value]) => {
    return { ...obj, [name]: value.replace(/px$/, "") };
  },
  {} as Breakpoints,
);

export function useTailwindBreakpoints() {
  const [screenWidth, setScreenWidth] = createSignal<number>(0);

  const onResize = throttle(() => {
    setScreenWidth(document.documentElement.clientWidth);
  }, 100);

  onMount(() => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      window.addEventListener("resize", onResize);
      setScreenWidth(document.documentElement.clientWidth);
    }
  });

  onCleanup(() => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      window.removeEventListener("resize", onResize);
    }
  });

  return { breakpoints, screenWidth };
}
