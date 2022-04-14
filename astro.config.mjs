import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
//import remarkGfm from "remark-gfm";
import remarkBehead from "remark-behead";
//import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
  ],
  markdown: {
    //remarkPlugins: [[remarkBehead, { depth: 1 }], [remarkGfm], [remarkMath]],
    remarkPlugins: [[remarkBehead, { depth: 1 }]],
    rehypePlugins: [[rehypeKatex]],
    shikiConfig: {
      theme: "one-dark-pro",
    },
  },
});
