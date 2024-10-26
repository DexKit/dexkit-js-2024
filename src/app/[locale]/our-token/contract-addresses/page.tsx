import React from 'react';
import { Metadata } from 'next';
import ContractAddressesContent from '@/app/our-token/contract-addresses/page';
import { getMessage } from '@/app/utils/locale';

export const generateMetadata = async (props: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
  const params = await props.params;
  return {
    title: getMessage('contractAddresses.title', params.locale),
    description: getMessage('contractAddresses.description', params.locale),
  };
};

export default function ContractAddressesPage() {
  return (
    <>
      <ContractAddressesContent />
    </>
  );
}