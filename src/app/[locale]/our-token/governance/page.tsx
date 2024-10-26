import React from 'react';
import { Metadata } from 'next';
import GovernanceContent from '@/app/our-token/governance/page';
import { getMessage } from '@/app/utils/locale';

export const generateMetadata = async (props: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
  const params = await props.params;
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