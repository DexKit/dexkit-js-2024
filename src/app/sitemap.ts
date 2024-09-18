import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

function getBlogSlugs(lang: 'en' | 'es') {
  const postsDirectory = path.join(process.cwd(), 'content', lang === 'en' ? 'blog' : 'blog-es')
  return fs.readdirSync(postsDirectory).map(fileName => fileName.replace(/\.md$/, ''))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const enBlogSlugs = getBlogSlugs('en')
  const esBlogSlugs = getBlogSlugs('es')
  
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
    { route: '/blog-es', priority: 0.7, changefreq: 'weekly' as const },
    { route: '/roadmap', priority: 0.6, changefreq: 'monthly' as const },
  ].map(({ route, priority, changefreq }) => ({
    url: `https://dexkit.com${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: changefreq,
    priority: priority,
  }))

  const enBlogRoutes = enBlogSlugs.map((slug) => ({
    url: `https://dexkit.com/blog/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const esBlogRoutes = esBlogSlugs.map((slug) => ({
    url: `https://dexkit.com/blog-es/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...routes, ...enBlogRoutes, ...esBlogRoutes]
}