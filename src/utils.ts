type AstroHeading = { depth: number; slug: string; text: string };

export type HeadingNode = {
  level: number;
  text: string;
  slug: string;
  children: HeadingNode[];
};

export function buildHeadingTree(headings: AstroHeading[]): HeadingNode {
  let tree: HeadingNode = {
    level: 1,
    text: "[Root]",
    slug: "",
    children: [
      { level: 2, text: "Introduction", slug: "introduction", children: [] },
    ],
  };
  const parentStack = [tree];
  const reverseHistory: HeadingNode[] = [];

  for (const heading of headings) {
    const headingNode = {
      level: heading.depth,
      text: heading.text.trim(),
      slug: heading.slug,
      children: [],
    };

    if (reverseHistory.length > 0) {
      if (heading.depth > reverseHistory[0].level) {
        parentStack.unshift(reverseHistory[0]);
      } else if (heading.depth < reverseHistory[0].level) {
        for (let i = 0; i < reverseHistory[0].level - heading.depth; i++) {
          parentStack.shift();
        }
      }
    }

    parentStack[0].children.push(headingNode);

    reverseHistory.unshift(headingNode);
  }

  while (parentStack.length > 1) {
    parentStack.shift();
  }

  return parentStack[0];
}
