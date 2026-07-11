import { Metadata } from 'next';
import DexSwap from '../../dexswap/page';
import ProductJsonLd from '@/app/components/ProductJsonLd';
import { generateProductMetadata } from '@/app/utils/product-metadata';
import { DEXSWAP_CONFIG } from '@/app/utils/product-pages';

export const generateMetadata = async (props: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
  const params = await props.params;
  return generateProductMetadata(params.locale, 'dexswap');
};

export default async function LocalizedDexSwap(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;

  return (
    <>
      <ProductJsonLd
        locale={params.locale}
        slug="dexswap"
        faqCount={DEXSWAP_CONFIG.faqCount}
        ctaUrl={DEXSWAP_CONFIG.ctaUrl}
      />
      <DexSwap />
    </>
  );
}
