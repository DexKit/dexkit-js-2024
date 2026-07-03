import { buildRssXml } from '@/app/utils/rssFeed';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function GET() {
  const rss = buildRssXml();

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
