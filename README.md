# In Progress: Learning Out Loud

Somewhere between SQL and self-growth. Built with Next.js 14, MDX, and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

- Posts live in `./posts/*.mdx` with frontmatter:

```md
---
title: My Post
date: 2025-02-01
description: A short summary.
---

Your MDX content...
```

## Build and start

```bash
npm run build
npm start
```

## Deploying to Vercel

- This app works out-of-the-box on Vercel.
- Framework preset: Next.js
- Build command: `next build`
- Install command: `npm install`
- Output: (Next.js default)
- Node version: >= 18.18 (set in `package.json` engines)

### Environment
No runtime env vars required. Content is statically generated from `posts/`.

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Next.js + MDX blog"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

Then import the repository on Vercel and deploy.