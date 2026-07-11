import { Metadata } from 'next';
import DexAppBuilder from '../../dexappbuilder/page';
import ProductJsonLd from '@/app/components/ProductJsonLd';
import { generateProductMetadata } from '@/app/utils/product-metadata';
import { DEXAPPBUILDER_CONFIG } from '@/app/utils/product-pages';

export const generateMetadata = async (props: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
  const params = await props.params;
  return generateProductMetadata(params.locale, 'dexappbuilder');
};

export default async function LocalizedDexAppBuilder(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;

  return (
    <>
      <ProductJsonLd
        locale={params.locale}
        slug="dexappbuilder"
        faqCount={DEXAPPBUILDER_CONFIG.faqCount}
        ctaUrl={DEXAPPBUILDER_CONFIG.ctaUrl}
      />
      <DexAppBuilder />
    </>
  );
}
