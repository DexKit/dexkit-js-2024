'use client';

import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  const socialNetworks = [
    { name: 'Discord', icon: 'fa-brands fa-discord', url: 'https://discord.com/invite/dexkit-official-943552525217435649' },
    { name: 'YouTube', icon: 'fa-brands fa-youtube', url: 'https://www.youtube.com/@DexKit' },
    { name: 'Twitter', icon: 'fa-brands fa-twitter', url: 'https://twitter.com/dexkit' },
    { name: 'Telegram', icon: 'fa-brands fa-telegram', url: 'https://t.me/dexkit' },
    { name: 'LinkedIn', icon: 'fa-brands fa-linkedin', url: 'https://www.linkedin.com/company/dexkit' },
    { name: 'Reddit', icon: 'fa-brands fa-reddit', url: 'https://www.reddit.com/r/dexkit' },
    { name: 'Medium', icon: 'fa-brands fa-medium', url: 'https://dexkit.medium.com/' },
    { name: 'Instagram', icon: 'fa-brands fa-instagram', url: 'https://www.instagram.com/dexkit.io' },
    { name: 'Facebook', icon: 'fa-brands fa-facebook', url: 'https://www.facebook.com/dexkit.io' },
  ]

  const linkProps = {
    target: "_blank",
    rel: "noopener noreferrer",
    className: "text-white hover:text-orange-400 transition duration-300"
  };

  return (
    <footer className="py-16 w-full text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="mb-8 md:mb-0 pl-4">
            <div style={{ width: '200px', height: '76px' }}>
              <Image 
                src="/imgs/dexkit-logo-white.svg" 
                alt="DexKit Logo" 
                width={100}
                height={76}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 pr-4">
            <h3 className="text-4xl font-semibold mb-4">Newsletter</h3>
            <p className="mb-4">Join the DexKit community and stay ahead of the rapidly-evolving DeFi landscape.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow p-2 rounded-l-md bg-transparent border border-gray-400 text-white placeholder-gray-400"
              />
              <button type="submit" className="bg-orange-400 text-white p-2 rounded-r-md hover:bg-orange-500 transition duration-300">
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
        <div className="flex justify-start space-x-6 mt-8 pl-4">
          {socialNetworks.map((social) => (
            <Link 
              key={social.name} 
              href={social.url} 
              {...linkProps}
            >
              <span className="sr-only">{social.name}</span>
              <i className={`${social.icon} text-2xl`}></i>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}