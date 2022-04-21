function recursivelyMarkFilesAndDirectoriesWithin(list) {
  for (const listItem of list.children) {
    if (listItem.tagName === "LI") {
      let markAsDirectory = false;

      for (const child of listItem.childNodes) {
        if (child instanceof Text) {
          if (child.textContent.trim().length > 0) {
            const span = document.createElement("span");
            span.textContent = child.textContent;
            child.replaceWith(span);
          }
        } else if (child instanceof Element) {
          if (child.tagName === "UL") {
            recursivelyMarkFilesAndDirectoriesWithin(child);
            markAsDirectory = true;
          }
        }
      }

      if (markAsDirectory) {
        listItem.classList.add("file-tree__directory");
      } else {
        listItem.classList.add("file-tree__file");
      }
    }
  }
}

export default class FileTree {
  constructor({ element }) {
    this.element = element;
  }

  render() {
    recursivelyMarkFilesAndDirectoriesWithin(this.element);
  }
}
