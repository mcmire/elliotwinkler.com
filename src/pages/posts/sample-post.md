---
layout: ../../layouts/BlogPostLayout.astro
setup: |
  import Image from "@components/Image.astro"
  import Video from "@components/Video.astro"
title: Test blog post
teaser: A simple blog post for testing purposes.
date: 2022-04-10
---

## Standard blog post things

### Inline formatting

This is a paragraph with some *emphasized* and **bold** text and maybe some
underlined text and even some ~~strikethrough~~ and hey why don't we try a
[link](https://google.com)? And maybe let's put [everything
***~~together~~***](https://google.com).

## Lists

### Unordered lists

There are a few reasons why this post is great:

- **It's short.** Is your post short? No, I didn't think so.  
  Hey, here's a line break just for fun.
- **It's got a puppy.** Seriously, scroll down.
- **Profit**. Gotta get that cash, yo.

### Numbered lists

Here's how you make a sandwich:

1. Get the bread.
1. Get the cheese.
1. Outsource that shit to the robots, they're gonna take us over anyway.

## Media

<Image
  url="https://www.dogtime.com/assets/uploads/2011/03/puppy-development.jpg"
  caption="Who likes puppies??" />

<Image
  url="http://www1.plurib.us/1shot/2008/eleven_below/eleven_below_single.svg"
  caption="We can embed SVGs in addition to PNGs and JPGs" />

<Video
  url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  caption="This is definitely, absolutely, Beethoven's 9th Symphony, and not some other video" />

## Code

You can always add `inline code` if you want. But you can also make code blocks:

First some Ruby:

``` ruby isUnbounded="true"
require_relative 'notion/authenticator'
require_relative 'notion/client'
require_relative 'notion/requestor'

module NotionCapture
  module Notion
    USER_ID = ENV.fetch('NOTION_USER_ID')
    TOKEN_FILE = NotionCapture::ROOT.join('tmp/.notion-token')

    def self.client
      @client ||= Client.new(Authenticator.new(TOKEN_FILE))
    end
  end
end
```

Then some JavaScript. This code block happens to be really long, and its full contents should appear in a modal:

``` jsx
/*
 * Looks for series of groupable blocks and sticks them together so that they
 * can be rendered using a single HTML element later.
 */
function groupBlocksByType(blocks) {
  let workingBlockType;
  let workingBlockGroup = [];
  const blockGroups = [];
  const groupableBlockTypes = Object.keys(groupingBlockComponents);

  blocks.forEach((block, i) => {
    if (
      workingBlockGroup.length > 0 &&
      (!groupableBlockTypes.includes(block.type) ||
        !groupableBlockTypes.includes(blocks[i - 1].type))
    ) {
      blockGroups.push({
        type: workingBlockType,
        blocks: workingBlockGroup,
      });
      workingBlockType = null;
      workingBlockGroup = [];
    }

    if (workingBlockType == null) {
      workingBlockType = block.type;
    }

    workingBlockGroup.push(block);
  });

  blockGroups.push({ type: workingBlockType, blocks: workingBlockGroup });

  return blockGroups;
}

function groupUngroupedBlocksByType(blockGroups) {
  return blockGroups.flatMap((group) => {
    const { type, blocks } = group;

    if (type === "ungrouped") {
      return groupBlocksByType(blocks);
    } else {
      return group;
    }
  });
}

export default function BlogPost({ blogEntry }) {
  const blockGroups = groupUngroupedBlocksByType(
    detectCustomComponentsWithWysiwygContentWithin(blogEntry.blocks)
  );

  return (
    <div className="p-8 font-serif">
      <h2 className="font-semibold text-3xl font-sans text-center mb-8">
        {blogEntry.title}
      </h2>
      {blockGroups.map((group, index) => (
        <GroupingBlock key={index} group={group}>
          {group.blocks.map((block, index) => (
            <Block key={index} block={block} />
          ))}
        </GroupingBlock>
      ))}
    </div>
  );
}
```

Some HTML:

``` html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>The Chromamatic 5000</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!--<link rel="icon" href="./favicon.png" />-->
    <!--<link rel="stylesheet" href="./index.css" />-->
  </head>
  <body>
    <div id="root"></div>
    <script src="./index.js"></script>
  </body>
</html>
```
