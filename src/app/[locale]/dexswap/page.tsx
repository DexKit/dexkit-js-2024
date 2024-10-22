import { Metadata } from 'next';
import DexSwap from '../../dexswap/page';
import { getMessage } from '@/app/utils/locale';

export const generateMetadata = async ({ params }: { params: { locale: string } }): Promise<Metadata> => {
  return {
    title: getMessage('dexswap.title', params.locale),
    description: getMessage('dexswap.subtitle', params.locale),
  };
};

export default function LocalizedDexSwap() {
  return (
    <>
      <DexSwap />
    </>
  );
}