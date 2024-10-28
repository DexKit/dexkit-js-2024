'use client';

import { useIntl } from 'react-intl';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import Hero from '../components/Hero'
import Partners from '../components/Partners'
import ProblemsAndSolutions from '../components/ProblemsAndSolutions'
import WhatIsDexKit from '../components/WhatIsDexKit'
import Product from '../components/Product'
import Solutions from '../components/Solutions'
import { Locale } from '../i18n/config';

export default function HomePage() {
  const params = useParams();
  const locale = params?.locale as Locale;
  const intl = useIntl();

  useEffect(() => {
    const pageTitle = intl.formatMessage({ id: 'home.title' });
    document.title = pageTitle;
  }, [intl]);

  console.log('HomePage rendering with locale:', locale);
  return (
    <>
      <Hero />
      <ProblemsAndSolutions />
      <WhatIsDexKit />
      <Product />
      <Solutions />
      <Partners />
    </>
  );
}
