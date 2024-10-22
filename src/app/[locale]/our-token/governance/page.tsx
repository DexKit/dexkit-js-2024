import React from 'react';
import { Metadata } from 'next';
import GovernanceContent from '@/app/our-token/governance/page';
import { getMessage } from '@/app/utils/locale';

export const generateMetadata = async ({ params }: { params: { locale: string } }): Promise<Metadata> => {
  return {
    title: getMessage('governance.title', params.locale),
    description: getMessage('governance.description', params.locale),
  };
};

export default function GovernancePage() {
  return (
    <>
      <GovernanceContent />
    </>
  );
}