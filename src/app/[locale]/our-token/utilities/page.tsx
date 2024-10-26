import React from 'react';
import { Metadata } from 'next';
import UtilitiesContent from '@/app/our-token/utilities/page';
import { getMessage } from '@/app/utils/locale';

export const generateMetadata = async (props: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
  const params = await props.params;
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