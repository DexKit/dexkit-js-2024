import React from 'react';
import RoadmapPageComponent from '@/app/roadmap/page';
import { Metadata } from 'next';
import { getMessage } from '@/app/utils/locale';

export const generateMetadata = async (props: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
  const params = await props.params;
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