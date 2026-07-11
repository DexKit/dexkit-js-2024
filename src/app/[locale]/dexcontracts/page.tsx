import { Metadata } from 'next';
import DexContracts from '../../dexcontracts/page';
import ProductJsonLd from '@/app/components/ProductJsonLd';
import { generateProductMetadata } from '@/app/utils/product-metadata';
import { DEXCONTRACTS_CONFIG } from '@/app/utils/product-pages';

export const generateMetadata = async (props: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
  const params = await props.params;
  return generateProductMetadata(params.locale, 'dexcontracts');
};

export default async function LocalizedDexContracts(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;

  return (
    <>
      <ProductJsonLd
        locale={params.locale}
        slug="dexcontracts"
        faqCount={DEXCONTRACTS_CONFIG.faqCount}
        ctaUrl={DEXCONTRACTS_CONFIG.ctaUrl}
      />
      <DexContracts />
    </>
  );
}
