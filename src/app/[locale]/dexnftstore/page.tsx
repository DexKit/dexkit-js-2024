import { Metadata } from 'next';
import DexNFTStore from '../../dexnftstore/page';
import { getMessage } from '@/app/utils/locale';

export const generateMetadata = async ({ params }: { params: { locale: string } }): Promise<Metadata> => {
  return {
    title: getMessage('dexnftstore.title', params.locale),
    description: getMessage('dexnftstore.subtitle', params.locale),
  };
};

export default function LocalizedDexNFTStore() {
  return (
    <>
      <DexNFTStore />
    </>
  );
}