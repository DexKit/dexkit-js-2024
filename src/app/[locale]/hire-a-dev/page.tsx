import { Metadata } from 'next';
import { getMessage } from '@/app/utils/locale';
import HireADevForm from '@/app/components/HireADevForm';

export const generateMetadata = async (props: { 
  params: { locale: string },
  searchParams: { service?: string } 
}): Promise<Metadata> => {
  const { locale } = props.params;
  const { service } = props.searchParams;

  // Título base
  let title = getMessage('hireADev.title', locale);
  let description = getMessage('hireADev.description', locale);

  if (service) {
    const serviceId = `hireADev.services.${service}.title`;
    const serviceName = getMessage(serviceId, locale);
    
    if (serviceName && serviceName !== serviceId) {
      title = `${serviceName} - ${title}`;
      description = getMessage(`hireADev.services.${service}.desc`, locale) || description;
    }
  }
  
  return {
    title,
    description,
  };
};

export default function LocalizedHireADevPage() {
  return <HireADevForm />;
} 