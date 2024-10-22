import { Metadata } from 'next';
import TokenomicsContent from '@/app/our-token/tokenomics/page';
import { getMessage } from '@/app/utils/locale';

export const generateMetadata = async ({ params }: { params: { locale: string } }): Promise<Metadata> => {
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