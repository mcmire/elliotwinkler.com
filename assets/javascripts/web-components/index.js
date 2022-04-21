import FileTree from "./FileTree";
import FileTreeDirectory from "./FileTreeDirectory";
import FileTreeFile from "./FileTreeFile";

export function loadWebComponents() {
  customElements.define("file-tree", FileTree);
  customElements.define("file-tree-directory", FileTreeDirectory);
  customElements.define("file-tree-file", FileTreeFile);
}
