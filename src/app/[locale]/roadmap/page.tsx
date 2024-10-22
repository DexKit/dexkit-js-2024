import React from 'react';
import RoadmapPageComponent from '@/app/roadmap/page';
import { Metadata } from 'next';
import { getMessage } from '@/app/utils/locale';

export const generateMetadata = async ({ params }: { params: { locale: string } }): Promise<Metadata> => {
  return {
    title: getMessage('roadmap.title', params.locale),
    description: getMessage('roadmap.description', params.locale),
  };
};

export default function RoadmapPage() {
  return (
    <>
      <RoadmapPageComponent />
    </>
  );
}