import { Metadata } from 'next';
import DexWallet from '../../dexwallet/page';
import { getMessage } from '@/app/utils/locale';

export const generateMetadata = async ({ params }: { params: { locale: string } }): Promise<Metadata> => {
  return {
    title: getMessage('dexwallet.title', params.locale),
    description: getMessage('dexwallet.subtitle', params.locale),
  };
};

export default function LocalizedDexWallet() {
  return (
    <>
      <DexWallet />
    </>
  );
}