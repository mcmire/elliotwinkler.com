import type { Extension, State, TokenizeContext, Code, Effects } from 'micromark-util-types';
import { codes } from 'micromark-util-symbol';

/**
 * Create a micromark extension to handle %% comment syntax.
 * Comments are removed during tokenization, so they don't appear in the output.
 *
 * @returns {Extension}
 *   Extension for micromark that handles %% comments.
 */
export function comments(): Extension {
  return {
    text: {
      [codes.percentSign]: {
        tokenize: tokenizeComment
      }
    }
  };
}

/**
 * Tokenize a comment.
 *
 * @this {TokenizeContext}
 */
function tokenizeComment(
  this: TokenizeContext,
  effects: Effects,
  ok: State,
  nok: State
): State {
  return start;

  /**
   * Start of comment.
   *
   * ```markdown
   * > | This is %%hidden%% text
   *              ^
   * ```
   */
  function start(code: Code): State | undefined {
    if (code !== codes.percentSign) return nok(code);
    
    effects.enter('comment' as any);
    effects.enter('commentMarker' as any);
    effects.consume(code);
    return openingMarker;
  }

  /**
   * In opening marker, after `%`.
   *
   * ```markdown
   * > | This is %%hidden%% text
   *               ^
   * ```
   */
  function openingMarker(code: Code): State | undefined {
    if (code === codes.percentSign) {
      effects.consume(code);
      effects.exit('commentMarker' as any);
      return commentData;
    }

    // Not a comment, just a single %
    return nok(code);
  }

  /**
   * In comment data.
   *
   * ```markdown
   * > | This is %%hidden%% text
   *                ^^^^^^
   * ```
   */
  function commentData(code: Code): State | undefined {
    // End of file - unclosed comment
    if (code === codes.eof) {
      return nok(code);
    }

    // Check for closing marker
    if (code === codes.percentSign) {
      effects.enter('commentMarker' as any);
      effects.consume(code);
      return closingMarker;
    }

    // Any other character is part of the comment
    effects.enter('commentData' as any);
    return commentDataInside(code);
  }

  /**
   * Inside comment data.
   */
  function commentDataInside(code: Code): State | undefined {
    if (code === codes.eof || code === codes.percentSign) {
      effects.exit('commentData' as any);
      return commentData(code);
    }

    effects.consume(code);
    return commentDataInside;
  }

  /**
   * In closing marker, after first `%`.
   *
   * ```markdown
   * > | This is %%hidden%% text
   *                      ^
   * ```
   */
  function closingMarker(code: Code): State | undefined {
    if (code === codes.percentSign) {
      effects.consume(code);
      effects.exit('commentMarker' as any);
      effects.exit('comment' as any);
      return ok;
    }

    // Not a closing marker, back to comment data
    effects.exit('commentMarker' as any);
    return commentData(code);
  }
}
