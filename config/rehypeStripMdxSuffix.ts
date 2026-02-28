import type { Root } from "hast";
import { visit } from "unist-util-visit";

export default function rehypeStripMdxSuffix() {
  return (tree: Root) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "a" && typeof node.properties.href === "string") {
        const [path, hash] = node.properties.href.split("#", 2);
        if (path.endsWith(".mdx")) {
          node.properties.href =
            path.slice(0, -4) + (hash !== undefined ? `#${hash}` : "");
        }
      }
    });
  };
}
