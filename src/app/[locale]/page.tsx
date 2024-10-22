'use client';

import { useIntl } from 'react-intl';
import { use, useEffect } from 'react';

import Hero from '../components/Hero'
import Partners from '../components/Partners'
import ProblemsAndSolutions from '../components/ProblemsAndSolutions'
import WhatIsDexKit from '../components/WhatIsDexKit'
import Product from '../components/Product'
import Solutions from '../components/Solutions'
import { Locale } from '../i18n/config';

export default function HomePage(props: { params: Promise<{ locale: Locale }> }) {
  const params = use(props.params);

  const {
    locale
  } = params;

  const intl = useIntl();

  useEffect(() => {
    document.title = intl.formatMessage({ id: 'home.title' });
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
  )
}
