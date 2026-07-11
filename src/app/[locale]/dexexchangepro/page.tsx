import { Metadata } from 'next';
import DexExchangePro from '../../dexexchangepro/page';
import ProductJsonLd from '@/app/components/ProductJsonLd';
import { generateProductMetadata } from '@/app/utils/product-metadata';
import { DEXEXCHANGEPRO_CONFIG } from '@/app/utils/product-pages';

export const generateMetadata = async (props: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
  const params = await props.params;
  return generateProductMetadata(params.locale, 'dexexchangepro');
};

export default async function LocalizedDexExchangePro(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;

  return (
    <>
      <ProductJsonLd
        locale={params.locale}
        slug="dexexchangepro"
        faqCount={DEXEXCHANGEPRO_CONFIG.faqCount}
        ctaUrl={DEXEXCHANGEPRO_CONFIG.ctaUrl}
      />
      <DexExchangePro />
    </>
  );
}
