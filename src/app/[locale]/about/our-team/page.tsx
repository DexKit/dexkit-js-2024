import { Metadata } from 'next';
import OurTeam from '../../../about/our-team/page';
import { getMessage } from '@/app/utils/locale';

export const generateMetadata = async ({ params }: { params: { locale: string } }): Promise<Metadata> => {
  return {
    title: getMessage('ourTeam.title', params.locale),
    description: getMessage('ourTeam.description', params.locale),
  };
};

export default function OurTeamPage() {
  return <OurTeam />;
}