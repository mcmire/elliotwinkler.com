import { map, invokeMap } from "lodash";

//import OverflowingCodeBlock from "./components/overflowing-code-block";
//import CodeModal from "./components/code-modal";
import FileTree from "./components/file-tree";
import GithubEmbed from "./components/github-embed";
import Grid from "./components/grid";
//import HighlightedCodeBlock from "./components/highlighted-code-block";
import IllustrationWrapper from "./components/illustration-wrapper";
import MathBlock from "./components/math-block";
import Spoiler from "./components/spoiler";
import Toc from "./components/toc";
import Svg from "./components/svg";
//import { loadWebComponents } from "./web-components";

import illustrationRegistry from "./services/illustration-registry";

function renderGrid() {
  const grid = new Grid({
    windowElement: window,
    bodyElement: document.body,
    contentElement: document.querySelector("[data-role='content']"),
  });
  grid.activate();
  grid.render();
}

/*
async function renderCodeBlocks() {
  const elements = document.querySelectorAll("pre");
  const codeBlocks = map(elements, (element) => {
    return new HighlightedCodeBlock({ element });
  });
  await Promise.all(invokeMap(codeBlocks, "activate"));
  invokeMap(codeBlocks, "render");
}
*/

function renderGithubEmbeds() {
  const elements = document.querySelectorAll("[data-role='github-embed']");
  const codeBlocks = map(elements, (element) => {
    return new GithubEmbed({ element });
  });
  invokeMap(codeBlocks, "render");
}

function renderMathBlocks() {
  const elements = document.querySelectorAll("script[type='math/katex']");

  elements.forEach((element) => {
    const mathBlock = new MathBlock({ element });
    mathBlock.render();
  });
}

function initSpoilers() {
  const elements = document.querySelectorAll(".spoiler");

  elements.forEach((element) => {
    const spoiler = new Spoiler({ element });
    spoiler.activate();
  });
}

function initIllustrations() {
  document.querySelectorAll("[data-illustration]").forEach((element) => {
    const illustrationName = element.getAttribute("data-illustration");
    const illustrationConstructor = illustrationRegistry.find(illustrationName);
    if (illustrationConstructor) {
      const illustrationWrapper = new IllustrationWrapper({
        element,
        illustrationConstructor,
      });
      illustrationWrapper.activate();
      illustrationWrapper.render();
    }
  });
}

function initSvg() {
  document.querySelectorAll("svg").forEach((element) => {
    const svg = new Svg(element);
    svg.activate();
    svg.render();
  });
}

function initFileTrees() {
  document.querySelectorAll(".file-tree").forEach((element) => {
    const fileTree = new FileTree({ element });
    fileTree.render();
  });
}

function initToc() {
  const tocElement = document.querySelector(".post #markdown-toc");
  const containerElement = document.querySelector("[data-container]");
  const articleAreaElement = document.querySelector("[data-article-area]");
  const articleHeaderElement = document.querySelector("[data-article-header]");
  const articleBodyElement = document.querySelector("[data-article-body]");
  const footerElement = document.querySelector("[data-footer]");

  if (
    tocElement &&
    containerElement &&
    articleAreaElement &&
    articleHeaderElement &&
    articleBodyElement &&
    footerElement
  ) {
    const toc = new Toc({
      element: tocElement,
      containerElement,
      articleAreaElement,
      articleHeaderElement,
      articleBodyElement,
      footerElement,
    });
    toc.activate();
    toc.render();
  }
}

export default async function init() {
  //renderGrid();

  //await renderCodeBlocks();
  renderGithubEmbeds();

  renderMathBlocks();
  initSpoilers();
  initIllustrations();
  initSvg();
  initFileTrees();
  initToc();

  //loadWebComponents();

  document.body.classList.remove("invisible");
}
