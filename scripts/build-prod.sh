#!/bin/bash

git clone https://github.com/mcmire/personal-content--writings /tmp/personal-content--writings &&
  ln -s /tmp/personal-content--writings/posts src/content/posts &&
  astro build
