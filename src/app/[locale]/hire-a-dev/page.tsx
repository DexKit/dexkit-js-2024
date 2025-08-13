import { Metadata } from 'next';
import { getMessage } from '@/app/utils/locale';
import HireADevForm from '@/app/components/HireADevForm';

export const generateMetadata = async (props: { 
  params: Promise<{ locale: string }>,
  searchParams: Promise<{ service?: string }> 
}): Promise<Metadata> => {
  const { locale } = await props.params;
  const { service } = await props.searchParams;

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