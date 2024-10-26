import { Metadata } from 'next';
import DexGenerator from '../../dexgenerator/page';
import { getMessage } from '@/app/utils/locale';

export const generateMetadata = async (props: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
  const params = await props.params;
  return {
    title: getMessage('dexgenerator.title', params.locale),
    description: getMessage('dexgenerator.subtitle', params.locale),
  };
};

export default function LocalizedDexGenerator() {
  return (
    <>
      <DexGenerator />
    </>
  );
}