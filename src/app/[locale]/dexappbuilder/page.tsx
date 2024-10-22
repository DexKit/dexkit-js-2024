import { Metadata } from 'next';
import DexAppBuilder from '../../dexappbuilder/page';
import { getMessage } from '@/app/utils/locale';

export const generateMetadata = async ({ params }: { params: { locale: string } }): Promise<Metadata> => {
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