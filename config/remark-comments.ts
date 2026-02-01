import type { Plugin } from "unified";
import type { VFile } from "vfile";

/**
 * Remark plugin to hide Obsidian-style comments (%%...%%).
 * Comments can appear inline or span multiple lines.
 *
 * Note: This intercepts the parse method to pre-process the input before
 * parsing. This is necessary because comments can span multiple markdown
 * elements, which makes post-parse AST manipulation insufficient.
 */
const remarkHideComments: Plugin = function () {
  const self = this;
  const originalParse = self.parse.bind(self);

  self.parse = function (doc: string | VFile) {
    const text = typeof doc === "string" ? doc : String(doc);
    const cleaned = text.replace(/%%[\s\S]*?%%/g, "");
    return originalParse(cleaned);
  };
};

export default remarkHideComments;
