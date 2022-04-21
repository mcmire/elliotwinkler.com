import { throttle } from "lodash";

const TOP_PADDING = 32;
const THROTTLE_DURATION = 50;
// See tailwind.config.js
const XL_SCREEN_WIDTH = 900;

function isHidden(element) {
  const style = getComputedStyle(element);
  return style.getPropertyValue("display") === "none";
}

export default class Toc {
  constructor({
    element,
    containerElement,
    articleAreaElement,
    articleHeaderElement,
    articleBodyElement,
    footerElement,
  }) {
    this.element = element;
    this.containerElement = containerElement;
    this.articleAreaElement = articleAreaElement;
    this.articleHeaderElement = articleHeaderElement;
    this.articleBodyElement = articleBodyElement;
    this.footerElement = footerElement;

    this._links = element.querySelectorAll("a");
    this._onWindowScroll = throttle(
      this._renderContainer.bind(this),
      THROTTLE_DURATION
    );
    this._onWindowResize = throttle(
      this._onWindowResize.bind(this),
      THROTTLE_DURATION
    );
    this._onPopState = this._onPopState.bind(this);
    this._onHashChange = this._onHashChange.bind(this);
    this._onClickLink = this._onClickLink.bind(this);

    this._haveListenersBeenAdded = false;
    this._position = null;
    this._hasRepositioned = false;
  }

  activate() {
    window.addEventListener("resize", this._onWindowResize);
    this._onWindowResize();
    this.containerElement.appendChild(this.element);
  }

  render() {
    if (!this._hasBeenRepositioned) {
      this._hasBeenRepositioned = true;
    }

    if (isHidden(this.element) && this.position !== null) {
      if (this._hasRepositioned) {
        this.containerElement.classList.remove(
          "article-area-container--with-toc"
        );
        this.articleAreaElement.appendChild(this.articleHeaderElement);
        this.articleHeaderElement.classList.remove("post-header--with-toc");
        this.articleAreaElement.appendChild(this.articleBodyElement);
        this.articleBodyElement.classList.remove("post-body--with-toc");
        this.footerElement.classList.remove("footer--with-toc");
        this._hasRepositioned = false;
      }
      this._renderContainer();
      this._renderLinks();
      this._position = null;
    } else if (this._position === null) {
      if (!this._hasRepositioned) {
        this.containerElement.classList.add("article-area-container--with-toc");
        this.containerElement.appendChild(this.articleHeaderElement);
        this.articleHeaderElement.classList.add("post-header--with-toc");
        this.containerElement.appendChild(this.articleBodyElement);
        this.articleBodyElement.classList.add("post-body--with-toc");
        this.footerElement.classList.add("footer--with-toc");
        this._hasRepositioned = true;
      }

      // Should debounce: 500?
      const rect = this.element.getBoundingClientRect();
      this._position = {
        computed: {
          top: window.scrollY + rect.top,
          left: window.scrollX + rect.left,
        },
      };
      this._renderContainer();
      this._renderLinks();
    }
  }

  _addListeners() {
    document.addEventListener("scroll", this._onWindowScroll);
    window.addEventListener("popstate", this._onPopState);
    window.addEventListener("hashchange", this._onHashChange);
    history.scrollRestoration = "manual";
    setTimeout(() => {
      this._scrollTo(location.hash, { behavior: "auto" });
    }, 0);
  }

  _removeListeners() {
    document.removeEventListener("scroll", this._onWindowScroll);
    window.removeEventListener("popstate", this._onPopState);
    window.removeEventListener("hashchange", this._onHashChange);
    history.scrollRestoration = "auto";
  }

  _renderContainer() {
    if (
      this._haveListenersBeenAdded &&
      this._position !== null &&
      window.scrollY > this._position.computed.top - TOP_PADDING
    ) {
      this.element.classList.add("sticky");
      this.element.style.top = `${TOP_PADDING}px`;
      this.element.style.left = `${this._position.computed.left}px`;
    } else {
      this.element.classList.remove("sticky");
      if (this._position !== null) {
        this.element.style.top = null;
        this.element.style.left = null;
      }
    }
  }

  _renderLinks() {
    if (this._haveListenersBeenAdded) {
      this._links.forEach((link) => {
        link.addEventListener("click", this._onClickLink);
      });
    } else {
      this._links.forEach((link) => {
        link.removeEventListener("click", this._onClickLink);
      });
    }
  }

  _onClickLink(event) {
    const link = event.currentTarget;
    event.preventDefault();

    if (link.href === location.href) {
      return;
    }

    const targetSelector = link.hash;
    this._scrollTo(targetSelector);
    history.pushState({}, "", event.currentTarget.href);
  }

  _onPopState(event) {
    event.preventDefault();
    this._scrollTo(location.hash);
  }

  _onHashChange(event) {
    event && event.preventDefault();
    this._scrollTo(location.hash);
  }

  _onWindowResize() {
    if (window.innerWidth >= XL_SCREEN_WIDTH) {
      if (this._haveListenersBeenAdded) {
        // TODO: This is wonky
        this._position = null;
        this.element.style.top = null;
        this.element.style.left = null;
        this.render();
      } else {
        this._haveListenersBeenAdded = true;
        this._addListeners();
        // Wait a bit so that the TOC appears on the page at the right position
        setTimeout(() => {
          this.render();
        }, 100);
      }
    } else if (this._haveListenersBeenAdded) {
      this._haveListenersBeenAdded = false;
      this._removeListeners();
      this.render();
    }
  }

  _scrollTo(targetSelector, { behavior = "smooth" } = {}) {
    if (targetSelector && targetSelector !== "#top") {
      const target = document.querySelector(targetSelector);
      if (target) {
        const targetRect = target.getBoundingClientRect();
        window.scrollTo({
          top: window.scrollY + targetRect.top - 16,
          behavior,
        });
        return;
      }
    }

    window.scrollTo({
      top: 0,
      behavior,
    });
  }
}
