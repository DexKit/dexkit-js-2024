import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

function getBlogSlugs(lang: 'en' | 'es' | 'pt') {
  const postsDirectory = path.join(process.cwd(), 'content', lang === 'en' ? 'blog' : `blog-${lang}`)
  return fs.readdirSync(postsDirectory).map(fileName => fileName.replace(/\.md$/, ''))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const enBlogSlugs = getBlogSlugs('en')
  const esBlogSlugs = getBlogSlugs('es')
  const ptBlogSlugs = getBlogSlugs('pt')
  
  const baseRoutes = [
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
    { route: '/about', priority: 0.6, changefreq: 'monthly' as const },
    { route: '/about/mission-vision-values', priority: 0.6, changefreq: 'monthly' as const },
    { route: '/about/our-team', priority: 0.6, changefreq: 'monthly' as const },
    { route: '/about/brand-material', priority: 0.6, changefreq: 'monthly' as const },
    { route: '/our-token/tokenomics', priority: 0.7, changefreq: 'monthly' as const },
    { route: '/our-token/utilities', priority: 0.7, changefreq: 'monthly' as const },
    { route: '/our-token/contract-addresses', priority: 0.7, changefreq: 'monthly' as const },
    { route: '/our-token/governance', priority: 0.7, changefreq: 'monthly' as const },
  ]

  const routes = baseRoutes.map(({ route, priority, changefreq }) => ({
    url: `https://dexkit.com${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: changefreq,
    priority: priority,
  }))

  const locales = ['es', 'pt']

  const localizedRoutes = locales.flatMap(locale => 
    baseRoutes.map(({ route, priority, changefreq }) => ({
      url: `https://dexkit.com/${locale}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: changefreq,
      priority: priority,
    }))
  )

  const enBlogRoutes = enBlogSlugs.map((slug) => ({
    url: `https://dexkit.com/blog/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const esBlogRoutes = esBlogSlugs.map((slug) => ({
    url: `https://dexkit.com/es/blog/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const ptBlogRoutes = ptBlogSlugs.map((slug) => ({
    url: `https://dexkit.com/pt/blog/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...routes, ...localizedRoutes, ...enBlogRoutes, ...esBlogRoutes, ...ptBlogRoutes]
}