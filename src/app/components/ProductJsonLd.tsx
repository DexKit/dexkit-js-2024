import { getMessage } from '@/app/utils/locale';
import { productPagePath } from '@/app/utils/product-metadata';

type ProductSlug = 'dexappbuilder' | 'dexswap' | 'dexwallet' | 'dexexchangepro' | 'dexnftstore' | 'dexnftmarket' | 'dexcontracts';

type ProductJsonLdProps = {
  locale: string;
  slug: ProductSlug;
  faqCount: number;
  ctaUrl: string;
};

function buildFaqEntities(locale: string, slug: ProductSlug, faqCount: number) {
  return Array.from({ length: faqCount }, (_, index) => {
    const n = index + 1;
    return {
      '@type': 'Question',
      name: getMessage(`${slug}.faq.q${n}`, locale),
      acceptedAnswer: {
        '@type': 'Answer',
        text: getMessage(`${slug}.faq.a${n}`, locale),
      },
    };
  });
}

export default function ProductJsonLd({
  locale,
  slug,
  faqCount,
  ctaUrl,
}: ProductJsonLdProps) {
  const title = getMessage(`${slug}.title`, locale);
  const description = getMessage(`${slug}.seo.description`, locale);
  const pageUrl = `https://dexkit.com${productPagePath(slug, locale)}`;

  const graph = [
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: title,
      description,
      isPartOf: {
        '@type': 'WebSite',
        name: 'DexKit',
        url: 'https://dexkit.com',
      },
      about: {
        '@type': 'SoftwareApplication',
        name: title,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        description,
        url: ctaUrl,
        provider: {
          '@type': 'Organization',
          name: 'DexKit',
          url: 'https://dexkit.com',
        },
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: buildFaqEntities(locale, slug, faqCount),
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }) }}
    />
  );
}
