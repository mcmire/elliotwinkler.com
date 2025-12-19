import throttle from "throttleit";
import { createSignal, onCleanup, onMount } from "solid-js";

export function useScreenWidth() {
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

  return { screenWidth };
}
