/// <reference types="mdast-util-directive" />

import type { Root } from "mdast";
import { visit } from "unist-util-visit";

export default function remarkCallout() {
  return (tree: Root) => {
    visit(tree, (node) => {
      if (node.type === "containerDirective" && node.name === "callout") {
        // See <https://github.com/syntax-tree/mdast-util-to-hast#fields-on-nodes>
        // for what `node.data` does

        const calloutType = node.attributes?.type ?? "note";
        const calloutTitle = node.attributes?.title;

        node.data = {
          ...node.data,
          hName: "div",
          hProperties: {
            class: `callout callout--${calloutType}`,
            "data-callout-type": calloutType,
            "data-callout-title": calloutTitle,
          },
        };
      }
    });
  };
}
