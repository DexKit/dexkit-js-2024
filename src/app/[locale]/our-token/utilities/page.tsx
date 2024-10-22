import React from 'react';
import { Metadata } from 'next';
import UtilitiesContent from '@/app/our-token/utilities/page';
import { getMessage } from '@/app/utils/locale';

export const generateMetadata = async ({ params }: { params: { locale: string } }): Promise<Metadata> => {
  return {
    title: getMessage('utilities.title', params.locale),
    description: getMessage('utilities.description', params.locale),
  };
};

export default function UtilitiesPage() {
  return (
    <>
      <UtilitiesContent />
    </>
  );
}