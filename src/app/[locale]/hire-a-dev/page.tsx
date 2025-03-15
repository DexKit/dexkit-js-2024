import { Metadata } from 'next';
import { getMessage } from '@/app/utils/locale';
import HireADevForm from '@/app/components/HireADevForm';

export const generateMetadata = async (props: { params: { locale: string } }): Promise<Metadata> => {
  return {
    title: getMessage('hireADev.title', props.params.locale),
    description: getMessage('hireADev.description', props.params.locale),
  };
};

export default function LocalizedHireADevPage() {
  return <HireADevForm />;
} 