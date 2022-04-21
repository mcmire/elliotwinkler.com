export default class FileTreeFile extends HTMLElement {
  constructor() {
    super();

    //const template = document.getElementById("file-tree-file-template").content;
    //const shadow = this.attachShadow({ mode: "open" });
    //console.log("template", template);
    //shadow.appendChild(template.cloneNode(true));
    const span = document.createElement("span");
    span.innerHTML = this.getAttribute("name");
    this.prepend(span);
  }
}
