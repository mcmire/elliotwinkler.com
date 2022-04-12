import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import remarkGfm from "remark-gfm";
import remarkBehead from "remark-behead";

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
    remarkPlugins: [[remarkGfm], [remarkBehead, { depth: 1 }]],
    shikiConfig: {
      theme: "one-dark-pro",
    },
  },
});
