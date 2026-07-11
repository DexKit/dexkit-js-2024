import { Metadata } from 'next';
import { getMessage } from '@/app/utils/locale';

const BASE_URL = 'https://dexkit.com';
const OG_IMAGE = `${BASE_URL}/imgs/dexkit_og.png`;

const LOCALE_TAGS: Record<string, string> = {
  en: 'en-US',
  es: 'es-ES',
  pt: 'pt-BR',
};

export function productPagePath(slug: string, locale: string): string {
  return locale === 'en' ? `/${slug}` : `/${locale}/${slug}`;
}

export function generateProductMetadata(
  locale: string,
  slug: 'dexswap' | 'dexwallet' | 'dexexchangepro' | 'dexnftstore' | 'dexnftmarket' | 'dexcontracts' | 'dexappbuilder',
): Metadata {
  const title = getMessage(`${slug}.title`, locale);
  const description = getMessage(`${slug}.seo.description`, locale);
  const path = productPagePath(slug, locale);
  const canonical = `${BASE_URL}${path}`;
  const ogLocale = LOCALE_TAGS[locale] ?? LOCALE_TAGS.en;

  return {
    title,
    description,
    keywords: getMessage(`${slug}.seo.keywords`, locale).split(',').map((k) => k.trim()),
    alternates: {
      canonical,
      languages: {
        'en-US': productPagePath(slug, 'en'),
        'es-ES': productPagePath(slug, 'es'),
        'pt-BR': productPagePath(slug, 'pt'),
      },
    },
    openGraph: {
      title: `${title} | DexKit`,
      description,
      url: canonical,
      siteName: 'DexKit',
      locale: ogLocale,
      type: 'website',
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${title} — DexKit`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | DexKit`,
      description,
      site: '@dexkit',
      images: [OG_IMAGE],
    },
  };
}
