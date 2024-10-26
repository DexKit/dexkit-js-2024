import { Metadata } from 'next';
import OurTeam from '../../../about/our-team/page';
import { getMessage } from '@/app/utils/locale';

export const generateMetadata = async (props: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
  const params = await props.params;
  return {
    title: getMessage('ourTeam.title', params.locale),
    description: getMessage('ourTeam.description', params.locale),
  };
};

export default function OurTeamPage() {
  return <OurTeam />;
}