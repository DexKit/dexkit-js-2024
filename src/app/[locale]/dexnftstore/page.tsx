import { Metadata } from 'next';
import DexNFTStore from '../../dexnftstore/page';
import ProductJsonLd from '@/app/components/ProductJsonLd';
import { generateProductMetadata } from '@/app/utils/product-metadata';
import { DEXNFTSTORE_CONFIG } from '@/app/utils/product-pages';

export const generateMetadata = async (props: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
  const params = await props.params;
  return generateProductMetadata(params.locale, 'dexnftstore');
};

export default async function LocalizedDexNFTStore(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;

  return (
    <>
      <ProductJsonLd
        locale={params.locale}
        slug="dexnftstore"
        faqCount={DEXNFTSTORE_CONFIG.faqCount}
        ctaUrl={DEXNFTSTORE_CONFIG.ctaUrl}
      />
      <DexNFTStore />
    </>
  );
}
