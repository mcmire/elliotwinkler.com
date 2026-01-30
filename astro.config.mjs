import fs from "fs";
import path from "path";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeCallouts from "rehype-callouts";
// import remarkGithubAdmonitionsToDirectives from "remark-github-admonitions-to-directives";
import remarkDirective from "remark-directive";
import remarkMath from "remark-math";
import remarkCodeTitle from "remark-code-title";
import {
  transformerMetaHighlight,
  transformerRemoveLineBreak,
} from "@shikijs/transformers";
import { fromHtml } from "hast-util-from-html";
import remarkCallout from "./config/remarkCallout.ts";
import rehypeCallout from "./config/rehypeCallout.ts";
import remarkComments from "./config/remark-comments.ts";
import icon from "astro-icon";
import solidJs from "@astrojs/solid-js";
const dirname = import.meta.dirname;
const linkIcon = fs.readFileSync(
  path.resolve(dirname, "./public/icons/heroicons/mini/link.svg"),
);
function transformerAddDummySpaceToEmptyLine() {
  return {
    line(node) {
      if (node.children.length === 0) {
        node.children.push({
          type: "text",
          value: " ",
        });
      }
    },
    code(node) {
      const lastChild = node.children[node.children.length - 1];
      if (
        lastChild &&
        lastChild.children.length === 1 &&
        lastChild.children[0].value === " "
      ) {
        node.children.pop();
      }
    },
  };
}
function transformerRemoveLastEmptyLine() {
  return {
    code(node) {
      const lastChild = node.children[node.children.length - 1];
      if (
        lastChild &&
        lastChild.children.length === 1 &&
        lastChild.children[0].value === " "
      ) {
        node.children.pop();
      }
    },
  };
}

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [
      // remarkGithubAdmonitionsToDirectives,
      remarkDirective,
      remarkMath,
      remarkCallout,
      remarkCodeTitle,
      remarkComments,
    ],
    rehypePlugins: [
      rehypeKatex,
      rehypeCallout,
      // Note that Astro has the ability to assign IDs to headings — but this
      // hasn't happened yet, because its plugin is added later.
      // That said, `rehype-slug` uses `github-slugger`, which is the same thing
      // Astro uses, so we're not that far off.
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            ariaHidden: true,
            tabIndex: -1,
            class: "permalink",
          },
          content() {
            return [fromHtml(linkIcon)];
          },
        },
      ],
      rehypeCallouts,
    ],
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      transformers: [
        transformerMetaHighlight(),
        transformerRemoveLineBreak(),
        transformerAddDummySpaceToEmptyLine(),
        transformerRemoveLastEmptyLine(),
      ],
    },
  },
  integrations: [mdx(), icon(), solidJs()],
  vite: {
    plugins: [
      tailwindcss({
        applyBaseStyles: false,
        nesting: false,
      }),
    ],
  },
});
