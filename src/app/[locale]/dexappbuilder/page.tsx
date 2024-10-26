import { Metadata } from 'next';
import DexAppBuilder from '../../dexappbuilder/page';
import { getMessage } from '@/app/utils/locale';

export const generateMetadata = async (props: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
  const params = await props.params;
  return {
    title: getMessage('product.dexappbuilder.title', params.locale),
    description: getMessage('product.dexappbuilder.description', params.locale),
  };
};

export default function LocalizedDexAppBuilder() {
  return (
    <>
      <DexAppBuilder />
    </>
  );
}