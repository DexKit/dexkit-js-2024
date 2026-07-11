import { Metadata } from 'next';
import DexNFTMarket from '../../dexnftmarket/page';
import ProductJsonLd from '@/app/components/ProductJsonLd';
import { generateProductMetadata } from '@/app/utils/product-metadata';
import { DEXNFTMARKET_CONFIG } from '@/app/utils/product-pages';

export const generateMetadata = async (props: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
  const params = await props.params;
  return generateProductMetadata(params.locale, 'dexnftmarket');
};

export default async function LocalizedDexNFTMarket(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;

  return (
    <>
      <ProductJsonLd
        locale={params.locale}
        slug="dexnftmarket"
        faqCount={DEXNFTMARKET_CONFIG.faqCount}
        ctaUrl={DEXNFTMARKET_CONFIG.ctaUrl}
      />
      <DexNFTMarket />
    </>
  );
}
