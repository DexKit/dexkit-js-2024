import Hero from './components/Hero'
import ProblemsAndSolutions from './components/ProblemsAndSolutions'
import WhatIsDexKit from './components/WhatIsDexKit'
import Product from './components/Product'
import Solutions from './components/Solutions'
import Partners from './components/Partners'

export default function Home() {
  return (
    <div className="w-full">
      <main className="w-full">
        <Hero />
        <ProblemsAndSolutions />
        <WhatIsDexKit />
        <Product />
        <Solutions />
        <Partners />
      </main>
    </div>
  )
}