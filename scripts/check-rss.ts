import { buildRssXml, getNewestBlogPost } from '../src/app/utils/rssFeed';

const newestPost = getNewestBlogPost();
const rss = buildRssXml();
const langPrefix = newestPost.lang === 'en' ? '' : `/${newestPost.lang}`;
const expectedUrl = `https://dexkit.com${langPrefix}/blog/${newestPost.slug}`;

if (!rss.includes(expectedUrl)) {
  console.error('RSS feed is missing the newest blog post.');
  console.error(`Expected URL: ${expectedUrl}`);
  console.error(`Newest post: ${newestPost.title} (${newestPost.date})`);
  process.exit(1);
}

console.log(`RSS feed includes newest post: ${newestPost.slug}`);
