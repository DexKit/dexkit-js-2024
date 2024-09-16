# WordPress to Markdown Blog Migration Guide

This guide outlines the process of migrating blog posts from WordPress to a Markdown-based system using three scripts: `fromWpToJson.js`, `jsonToMarkdown.ts`, and `createPost.ts`.

## Step 1: Export WordPress Posts to JSON

Use the `fromWpToJson.js` script to fetch posts from your WordPress site and save them as a JSON file.

1. Install dependencies:

   ```
   npm install node-fetch fs cheerio
   ```

2. Run the script:

   ```
   node scripts/fromWpToJson.js
   ```

This will create a `blog-posts.json` file in the `public` directory and download images to `public/blog-images`.

## Step 2: Convert JSON to Markdown Files

Use the `jsonToMarkdown.ts` script to convert the JSON data into individual Markdown files.

1. Install dependencies:

   ```
   npm install jsdom turndown @types/jsdom @types/turndown
   ```

2. Run the script:

   ```
   npx ts-node scripts/jsonToMarkdown.ts
   ```

This will create Markdown files for each post in the `content/blog` directory.
