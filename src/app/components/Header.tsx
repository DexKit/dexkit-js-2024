'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="py-6 px-4 bg-transparent">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <Image 
            src="/imgs/dexkit-logo-white.png"
            alt="DexKit Logo" 
            width={150} 
            height={40} 
          />
        </Link>
        <nav>
          <ul className="flex space-x-6 items-center">
            <li><Link href="/about-us" className="text-white hover:text-orange-400 transition-colors duration-300">About us</Link></li>
            <li><Link href="/product" className="text-white hover:text-orange-400 transition-colors duration-300">Product</Link></li>
            <li><Link href="/solutions" className="text-white hover:text-orange-400 transition-colors duration-300">Solutions</Link></li>
            <li><Link href="/our-token" className="text-white hover:text-orange-400 transition-colors duration-300">Our token</Link></li>
            <li><Link href="/roadmap" className="text-white hover:text-orange-400 transition-colors duration-300">Roadmap</Link></li>
            <li><Link href="/blog" className="text-white hover:text-orange-400 transition-colors duration-300">Blog</Link></li>
            <li><Link href="/help-center" className="text-white hover:text-orange-400 transition-colors duration-300">Help center</Link></li>
            <li><Link href="/contact" className="text-white hover:text-orange-400 transition-colors duration-300">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}