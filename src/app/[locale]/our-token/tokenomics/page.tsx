import { Metadata } from 'next';
import TokenomicsContent from '@/app/our-token/tokenomics/page';
import { getMessage } from '@/app/utils/locale';

export const generateMetadata = async (props: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
  const params = await props.params;
  return {
    title: getMessage('tokenomics.title', params.locale),
    description: getMessage('tokenomics.description', params.locale),
  };
};

export default function TokenomicsPage() {
  return (
    <>
      <TokenomicsContent />
    </>
  );
}