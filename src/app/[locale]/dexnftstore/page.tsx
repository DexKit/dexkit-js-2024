import { Metadata } from 'next';
import DexNFTStore from '../../dexnftstore/page';
import { getMessage } from '@/app/utils/locale';

export const generateMetadata = async (props: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
  const params = await props.params;
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