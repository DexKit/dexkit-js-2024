import { Metadata } from 'next';
import DexWallet from '../../dexwallet/page';
import ProductJsonLd from '@/app/components/ProductJsonLd';
import { generateProductMetadata } from '@/app/utils/product-metadata';
import { DEXWALLET_CONFIG } from '@/app/utils/product-pages';

export const generateMetadata = async (props: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
  const params = await props.params;
  return generateProductMetadata(params.locale, 'dexwallet');
};

export default async function LocalizedDexWallet(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;

  return (
    <>
      <ProductJsonLd
        locale={params.locale}
        slug="dexwallet"
        faqCount={DEXWALLET_CONFIG.faqCount}
        ctaUrl={DEXWALLET_CONFIG.ctaUrl}
      />
      <DexWallet />
    </>
  );
}
