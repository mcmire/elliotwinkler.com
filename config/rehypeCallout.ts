import fs from "fs";
import type { Root } from "hast";
import { h } from "hastscript";
import path from "path";
import { visit } from "unist-util-visit";
import { fromHtml } from "hast-util-from-html";

const dirname = (import.meta as any).dirname;
const lightBulbIcon = fs.readFileSync(
  path.resolve(dirname, "../public/icons/heroicons/mini/light-bulb.svg"),
  "utf8",
);
const handRaisedIcon = fs.readFileSync(
  path.resolve(dirname, "../public/icons/heroicons/mini/hand-raised.svg"),
  "utf8",
);
const warningIcon = fs.readFileSync(
  path.resolve(dirname, "../public/icons/heroicons/mini/warning.svg"),
  "utf8",
);
const infoIcon = fs.readFileSync(
  path.resolve(
    dirname,
    "../public/icons/heroicons/mini/information-circle.svg",
  ),
  "utf8",
);

function determineHeader(calloutType: string | undefined) {
  switch (calloutType) {
    case "tip":
      return { icon: lightBulbIcon, text: "Tip" };
    case "warning":
      return { icon: warningIcon, text: "Warning" };
    case "stop":
      return { icon: handRaisedIcon, text: "Wait!" };
    default:
      return { icon: infoIcon, text: "Note" };
  }
}

export default function rehypeCallout() {
  return (tree: Root) => {
    visit(tree, "element", (node) => {
      // Under MDX, attributes are camelcased, but under Markdown, they are not
      const calloutType = (node.properties["data-callout-type"] ||
        node.properties.dataCalloutType) as string | undefined;
      const calloutTitle = (node.properties["data-callout-title"] ||
        node.properties.dataCalloutTitle) as string | undefined;

      if (calloutType) {
        const header = determineHeader(calloutType);
        node.children = [
          h("div", { class: "callout__header" }, [
            fromHtml(header.icon),
            calloutTitle || header.text,
          ]),
          h("div", { class: "callout__body" }, node.children),
        ];
      }
    });
  };
}
