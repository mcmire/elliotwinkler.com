import type { Root, Text } from "mdast";
import { visit } from "unist-util-visit";

/**
 * Remark plugin that removes commented text surrounded by %%.
 * Example: "This is visible %%this is hidden%% text" becomes "This is visible  text"
 * 
 * Note: This plugin works on text nodes only. In MDX files, HTML/JSX elements are parsed
 * before this plugin runs, so comments containing HTML will not work as expected.
 */
export default function remarkComments() {
  return (tree: Root) => {
    visit(tree, "text", (node: Text) => {
      if (!node.value || typeof node.value !== "string") {
        return;
      }

      // Remove all text between %% markers
      node.value = node.value.replace(/%%.*?%%/gs, "");
    });
  };
}
