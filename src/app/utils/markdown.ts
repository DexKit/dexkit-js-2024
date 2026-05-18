import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import html from 'remark-html';

/** Markdown → HTML with GFM (tables, strikethrough, task lists, autolinks). */
export async function markdownToHtml(content: string): Promise<string> {
  const processed = await remark().use(remarkGfm).use(html).process(content);
  return processed.toString();
}
