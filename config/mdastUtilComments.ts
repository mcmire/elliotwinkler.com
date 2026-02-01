import type { Extension as FromMarkdownExtension, CompileContext } from 'mdast-util-from-markdown';
import type { Options as ToMarkdownExtension } from 'mdast-util-to-markdown';

/**
 * Create an extension for `mdast-util-from-markdown` to enable comments.
 *
 * When `mdast-util-from-markdown` is used, pass this extension to it.
 *
 * @returns {FromMarkdownExtension}
 *   Extension for `mdast-util-from-markdown`.
 */
export function commentsFromMarkdown(): FromMarkdownExtension {
  return {
    enter: {
      comment: enterComment
    },
    exit: {
      comment: exitComment
    }
  };
}

/**
 * @this {CompileContext}
 */
function enterComment(this: CompileContext, token: any): undefined {
  // Comments are ignored and don't create any AST nodes
  // We just track that we're inside a comment
  this.buffer();
  return undefined;
}

/**
 * @this {CompileContext}
 */
function exitComment(this: CompileContext, token: any): undefined {
  // Exit comment mode and discard the buffered content
  this.resume();
  return undefined;
}

/**
 * Create an extension for `mdast-util-to-markdown` to enable comments.
 *
 * When `mdast-util-to-markdown` is used, pass this extension to it.
 *
 * @returns {ToMarkdownExtension}
 *   Extension for `mdast-util-to-markdown`.
 */
export function commentsToMarkdown(): ToMarkdownExtension {
  // Comments don't exist in the AST, so there's nothing to convert back
  return {};
}
