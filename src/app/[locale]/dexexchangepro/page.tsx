import { Metadata } from 'next';
import DexExchangePro from '../../dexexchangepro/page';
import { getMessage } from '@/app/utils/locale';

export const generateMetadata = async ({ params }: { params: { locale: string } }): Promise<Metadata> => {
  return {
    title: getMessage('dexexchangepro.title', params.locale),
    description: getMessage('dexexchangepro.subtitle', params.locale),
  };
};

export default function LocalizedDexExchangePro() {
  return (
    <>
      <DexExchangePro />
    </>
  );
}