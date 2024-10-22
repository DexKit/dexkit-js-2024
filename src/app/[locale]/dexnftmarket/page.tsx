import { Metadata } from 'next';
import DexNFTMarket from '../../dexnftmarket/page';
import { getMessage } from '@/app/utils/locale';

export const generateMetadata = async ({ params }: { params: { locale: string } }): Promise<Metadata> => {
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