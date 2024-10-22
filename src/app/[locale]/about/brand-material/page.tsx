import { Metadata } from 'next';
import BrandMaterial from '@/app/about/brand-material/page';
import { getMessage } from '@/app/utils/locale';

export const generateMetadata = async (props: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
  const params = await props.params;
  return {
    title: getMessage('brandMaterial.title', params.locale),
    description: getMessage('brandMaterial.description', params.locale),
  };
};

export default function BrandMaterialPage() {
  return <BrandMaterial />;
}