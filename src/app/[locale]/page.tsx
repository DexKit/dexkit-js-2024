'use client';

import Hero from '../components/Hero'
import Partners from '../components/Partners'
import ProblemsAndSolutions from '../components/ProblemsAndSolutions'
import WhatIsDexKit from '../components/WhatIsDexKit'
import Product from '../components/Product'
import Solutions from '../components/Solutions'
import { Locale } from '../i18n/config';

export default function HomePage({ params: { locale } }: { params: { locale: Locale } }) {
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