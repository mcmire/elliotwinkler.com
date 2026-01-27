import type { Root, Text } from "mdast";
import { visit, SKIP } from "unist-util-visit";

/**
 * Remark plugin that removes commented text surrounded by %%.
 * Example: "This is visible %%this is hidden%% text" becomes "This is visible  text"
 */
export default function remarkComments() {
  return (tree: Root) => {
    visit(tree, "text", (node: Text, index, parent) => {
      if (!node.value || typeof node.value !== "string") {
        return;
      }

      // Remove all text between %% markers
      const newValue = node.value.replace(/%%.*?%%/gs, "");

      // If the text changed, update the node
      if (newValue !== node.value) {
        node.value = newValue;
      }

      // If the text is now empty and we have parent/index info, remove the node
      if (newValue === "" && parent && typeof index === "number") {
        parent.children.splice(index, 1);
        return [SKIP, index];
      }
    });
  };
}
