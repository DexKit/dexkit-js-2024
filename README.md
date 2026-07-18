# Dexkit Home Page

## Blog Management

### IndexNow (search engine URL notification)

When blog markdown under `content/blog*`, `content/blog-pt*`, or `content/blog-es*` lands on `master`, GitHub Actions waits for Vercel deploy and submits the public URLs to [IndexNow](https://www.indexnow.org/) (Bing, Yandex, and other participants).

- Ownership key: `public/4171b1da1a684e82911439ebbc0a73c4.txt` → `https://dexkit.com/4171b1da1a684e82911439ebbc0a73c4.txt`
- Manual submit: `npm run indexnow -- --urls https://dexkit.com/blog/your-slug`
- From git range: `npm run indexnow -- --from-git HEAD~1`
- CI uses plain `node scripts/notify-indexnow.mjs` (no ts-node)

### Creating New Posts

To create new blog posts, please refer to the [Creating Posts Guide](creatingposts.md). This guide provides step-by-step instructions on how to create and format new blog posts using Markdown.

### Migrating from WordPress

If you're migrating content from a WordPress site, we've prepared a detailed guide to help you through the process. Please see the [Migrate from WordPress Guide](migratefromwp.md) for instructions on how to transfer your existing blog posts to this new system.

