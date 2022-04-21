import "../vendor/prism";

export default class HighlightedCodeBlock {
  constructor({ element }) {
    this.element = element;
    this.language = element.dataset.language;
  }

  async activate() {
    this.highlighter = await getHighlighter({ theme: "nord" });
  }

  render() {
    const html =
      this.language == null
        ? this.highlighter.codeToHtml(this.element.textContent)
        : this.highlighter.codeToHtml(this.element.textContent, {
            lang: this.language,
          });
    this.element.innerHTML = html;
  }
}
