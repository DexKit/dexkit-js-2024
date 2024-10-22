import React from 'react';
import { Metadata } from 'next';
import ContractAddressesContent from '@/app/our-token/contract-addresses/page';
import { getMessage } from '@/app/utils/locale';

export const generateMetadata = async ({ params }: { params: { locale: string } }): Promise<Metadata> => {
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