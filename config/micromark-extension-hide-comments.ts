import { markdownLineEnding } from "micromark-util-character";
import { codes, types } from "micromark-util-symbol";
import type {
  Extension,
  State,
  Effects,
  TokenizeContext,
  Code,
} from "micromark-util-types";
import { ok as assert } from "devlop";

export function hideComments(): Extension {
  // We need both of these because `text` handles text inside of a paragraph
  // (and can start in the middle of a paragraph), whereas `flow` handles
  // multi-line comments.
  return {
    // We don't seem to need this, but if we do we can always re-enable it.
    /*
    text: {
      [codes.percentSign]: {
        tokenize: tokenizeInlineComment,
        partial: true,
      },
    },
    */
    flow: {
      [codes.percentSign]: {
        tokenize: tokenizeBlockComment,
        concrete: true,
      },
    },
  };
}

function tokenizeInlineComment(
  this: TokenizeContext,
  effects: Effects,
  ok: State,
  nok: State,
): State {
  let isInside = false;

  return start;

  function start(code: Code): State | undefined {
    // This tokenizer already starts at %, but we confirm.
    // Source: <https://github.com/micromark/micromark-extension-directive/blob/d19906200feba667b351ce60ee511f6204b662e0/dev/lib/directive-container.js#L42>
    assert(code === codes.percentSign, "expected `%`");

    // Tentatively consume first %
    effects.consume(code);
    return maybeInside;
  }

  function maybeInside(code: Code): State | undefined {
    if (code === codes.percentSign) {
      // Confirm second %
      effects.consume(code);
      // @ts-expect-error This type doesn't exist, but that's okay.
      effects.enter("comment");
      isInside = true;
      return definitelyInside;
    }
    return nok(code);
  }

  function definitelyInside(code: Code): State | undefined {
    if (code === codes.percentSign) {
      // Tentatively consume first %
      effects.consume(code);
      return maybeClose;
    }

    if (markdownLineEnding(code) || code === codes.eof) {
      if (isInside) {
        return nok(code);
      }
      // @ts-expect-error This type doesn't exist, but that's okay.
      effects.exit("comment");
      return ok;
    }

    effects.consume(code);
    return definitelyInside;
  }

  function maybeClose(code: Code): State | undefined {
    if (code === codes.percentSign) {
      // Confirm second %
      // @ts-expect-error This type doesn't exist, but that's okay.
      effects.exit("comment");
      effects.consume(code);
      return ok;
    }

    effects.consume(code);
    return definitelyInside;
  }
}

function tokenizeBlockComment(
  this: TokenizeContext,
  effects: Effects,
  ok: State,
  nok: State,
): State {
  return start;

  function start(code: Code): State | undefined {
    // This tokenizer already starts at %, but we confirm.
    // Source: <https://github.com/micromark/micromark-extension-directive/blob/d19906200feba667b351ce60ee511f6204b662e0/dev/lib/directive-container.js#L42>
    assert(code === codes.percentSign, "expected `%`");

    // Tentatively consume first %
    effects.consume(code);
    return maybeInside;
  }

  function maybeInside(code: Code): State | undefined {
    if (code === codes.percentSign) {
      // Confirm second %
      effects.consume(code);
      return definitelyInside;
    }
    return nok(code);
  }

  function definitelyInside(code: Code): State | undefined {
    if (code === codes.percentSign) {
      // Tentatively consume first %
      effects.consume(code);
      return maybeClose;
    }

    if (markdownLineEnding(code)) {
      // This is necessary when encountering a line ending
      // See: <https://github.com/micromark/micromark-extension-frontmatter/blob/f05bf24461d31041f37f4562fd48877af4dcc67b/dev/lib/syntax.js>
      effects.enter(types.lineEnding);
      effects.consume(code);
      effects.exit(types.lineEnding);
      return definitelyInside;
    }

    if (code === codes.eof) {
      return nok(code);
    }

    effects.consume(code);
    return definitelyInside;
  }

  function maybeClose(code: Code): State | undefined {
    if (code === codes.percentSign) {
      // Confirm second %
      effects.consume(code);
      return ok;
    }

    effects.consume(code);
    return definitelyInside;
  }
}
