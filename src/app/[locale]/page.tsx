'use client';

import Hero from '../components/Hero'
import Partners from '../components/Partners'
import ProblemsAndSolutions from '../components/ProblemsAndSolutions'
import WhatIsDexKit from '../components/WhatIsDexKit'
import Product from '../components/Product'
import Solutions from '../components/Solutions'

export default function Home() {
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