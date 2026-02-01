/**
 * @import {Root} from 'mdast'
 * @import {Processor} from 'unified'
 */

import { comments } from "./micromarkComments.ts";
import {
  commentsFromMarkdown,
  commentsToMarkdown,
} from "./mdastUtilComments.ts";

/**
 * Remark plugin that removes commented text surrounded by %%.
 *
 * This plugin uses a Micromark extension to handle the syntax at the parsing level.
 * Comments are removed during tokenization, so they don't appear in the AST.
 *
 * Example: "This is visible %%this is hidden%% text" becomes "This is visible  text"
 *
 * Note: In MDX files, HTML/JSX elements are parsed before this plugin runs,
 * so comments containing HTML will not work as expected.
 *
 * @returns {undefined}
 *   Nothing.
 */
export default function remarkComments() {
  // @ts-expect-error: TS is wrong about `this`.
  // eslint-disable-next-line unicorn/no-this-assignment
  const self = /** @type {Processor<Root>} */ (this);
  const data = self.data();

  const micromarkExtensions =
    data.micromarkExtensions || (data.micromarkExtensions = []);
  const fromMarkdownExtensions =
    data.fromMarkdownExtensions || (data.fromMarkdownExtensions = []);
  const toMarkdownExtensions =
    data.toMarkdownExtensions || (data.toMarkdownExtensions = []);

  micromarkExtensions.push(comments());
  fromMarkdownExtensions.push(commentsFromMarkdown());
  toMarkdownExtensions.push(commentsToMarkdown());
}
