#!/bin/bash

if [[ -f .vercel/.env.production.local ]]; then
  source .vercel/.env.production.local
fi

if [[ -f .vercel/.env.preview.local ]]; then
  source .vercel/.env.preview.local
fi

if [[ -z "$WRITINGS_REPO_URL" ]]; then
  echo "WRITINGS_REPO_URL is required."
  exit 1
fi

if [[ -z "$WRITINGS_REPO_REF" ]]; then
  if [[ "$VERCEL_ENV" == "production" ]]; then
    WRITINGS_REPO_REF=main
  else
    echo "WRITINGS_REPO_REF is required."
    exit 1
  fi
fi

git clone --branch "$WRITINGS_REPO_REF" "$WRITINGS_REPO_URL" /tmp/writings &&
  ln -s /tmp/writings/posts src/content/posts &&
  astro build
