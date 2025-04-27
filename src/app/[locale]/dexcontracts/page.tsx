import { Metadata } from 'next';
import DexContracts from '../../dexcontracts/page';
import { getMessage } from '@/app/utils/locale';

export const generateMetadata = async (props: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
  const params = await props.params;
  return {
    title: getMessage('dexcontracts.title', params.locale),
    description: getMessage('dexcontracts.subtitle', params.locale),
  };
};

export default function LocalizedDexContracts() {
  return (
    <>
      <DexContracts />
    </>
  );
}