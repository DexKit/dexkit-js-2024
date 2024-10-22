import { Metadata } from 'next';
import DexNFTMarket from '../../dexnftmarket/page';
import { getMessage } from '@/app/utils/locale';

export const generateMetadata = async (props: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
  const params = await props.params;
  return {
    title: getMessage('dexnftmarket.title', params.locale),
    description: getMessage('dexnftmarket.subtitle', params.locale),
  };
};

export default function LocalizedDexNFTMarket() {
  return (
    <>
      <DexNFTMarket />
    </>
  );
}