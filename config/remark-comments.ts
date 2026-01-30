import type { Plugin } from "unified";
import { hideComments } from "./micromark-extension-hide-comments";
import type { Extension } from "micromark-util-types";

const remarkHideComments: Plugin = function () {
  const data = this.data() as {
    micromarkExtensions?: Extension[];
  };

  const micromarkExtensions =
    "micromarkExtensions" in data && Array.isArray(data.micromarkExtensions)
      ? data.micromarkExtensions
      : [];
  micromarkExtensions.push(hideComments());
  data.micromarkExtensions = micromarkExtensions;
};

export default remarkHideComments;
