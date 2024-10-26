import { Metadata } from 'next';
import DexExchangePro from '../../dexexchangepro/page';
import { getMessage } from '@/app/utils/locale';

export const generateMetadata = async (props: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
  const params = await props.params;
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