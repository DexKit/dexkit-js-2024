import { Metadata } from 'next';
import MissionVisionValues from '../../../about/mission-vision-values/page';
import { getMessage } from '@/app/utils/locale';

export const generateMetadata = async (props: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
  const params = await props.params;
  return {
    title: getMessage('missionVisionValues.title', params.locale),
    description: getMessage('missionVisionValues.description', params.locale),
  };
};

export default function LocalizedMissionVisionValues() {
  return (
    <>
      <MissionVisionValues />
    </>
  );
}