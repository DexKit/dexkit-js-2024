'use client';

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  const socialNetworks = [
    { name: 'Discord', icon: 'discord' },
    { name: 'YouTube', icon: 'youtube' },
    { name: 'Twitter', icon: 'twitter' },
    { name: 'Telegram', icon: 'telegram' },
    { name: 'LinkedIn', icon: 'linkedin' },
    { name: 'Reddit', icon: 'reddit' },
    { name: 'Medium', icon: 'medium' },
    { name: 'Instagram', icon: 'instagram' },
    { name: 'Facebook', icon: 'facebook' },
  ]

  return (
    <footer className="bg-purple-900 py-16 w-full text-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-8 md:mb-0">
            <Image 
              src="/imgs/dexkit-logo-white.png" 
              alt="DexKit Logo" 
              width={150} 
              height={40} 
            />
            <p className="mt-4">Making Web3 <span className="text-orange-400 font-bold">accessible</span>.</p>
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">Newsletter</h3>
            <p className="mb-4">Join the DexKit community and stay ahead of the rapidly-evolving DeFi landscape.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow p-2 rounded-l-md bg-purple-800 text-white placeholder-purple-300"
              />
              <button type="submit" className="bg-orange-400 text-white p-2 rounded-r-md hover:bg-orange-500 transition duration-300">
                <span className="sr-only">Subscribe</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>
        </div>
        <div className="flex justify-center space-x-6">
          {socialNetworks.map((social) => (
            <Link key={social.name} href={`#${social.name.toLowerCase()}`} className="text-white hover:text-orange-400 transition duration-300">
              <span className="sr-only">{social.name}</span>
              <i className={`fab fa-${social.icon} text-2xl`}></i>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}