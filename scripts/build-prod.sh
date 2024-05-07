#!/bin/bash

if [[ -z "$WRITINGS_REPO_URL" ]]; then
  echo "WRITINGS_REPO_URL is required."
  exit 1
fi

if [[ -z "$WRITINGS_REPO_REF" ]]; then
  echo "WRITINGS_REPO_REF is required."
  exit 1
fi

git clone --branch "$WRITINGS_REPO_REF" "$WRITINGS_REPO_URL" /tmp/writings &&
  ln -s /tmp/writings/posts src/content/posts &&
  astro build