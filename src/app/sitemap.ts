import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

function getBlogSlugs() {
  const postsDirectory = path.join(process.cwd(), 'content', 'blog')
  return fs.readdirSync(postsDirectory).map(fileName => fileName.replace(/\.md$/, ''))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const blogSlugs = getBlogSlugs()
  
  const routes = [
    { route: '', priority: 1.0, changefreq: 'weekly' as const },
    { route: '/dexappbuilder', priority: 0.9, changefreq: 'monthly' as const },
    { route: '/dexswap', priority: 0.8, changefreq: 'monthly' as const },
    { route: '/dexexchangepro', priority: 0.8, changefreq: 'monthly' as const },
    { route: '/dexgenerator', priority: 0.8, changefreq: 'monthly' as const },
    { route: '/dexwallet', priority: 0.8, changefreq: 'monthly' as const },
    { route: '/dexnftmarket', priority: 0.8, changefreq: 'monthly' as const },
    { route: '/dexnftstore', priority: 0.8, changefreq: 'monthly' as const },
    { route: '/blog', priority: 0.7, changefreq: 'weekly' as const },
    { route: '/roadmap', priority: 0.6, changefreq: 'monthly' as const },
  ].map(({ route, priority, changefreq }) => ({
    url: `https://dexkit.com${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: changefreq,
    priority: priority,
  }))

  const blogRoutes = blogSlugs.map((slug) => ({
    url: `https://dexkit.com/blog/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...routes, ...blogRoutes]
}