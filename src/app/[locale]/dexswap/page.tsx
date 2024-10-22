import { Metadata } from 'next';
import DexSwap from '../../dexswap/page';
import { getMessage } from '@/app/utils/locale';

export const generateMetadata = async (props: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
  const params = await props.params;
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