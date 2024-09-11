'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  const menuItems = [
    { 
      title: 'About us', 
      href: '#',
      subItems: [
        { name: 'Mission, vision and values', href: 'https://docs.dexkit.com/welcome/the-startup/mission-vision-and-values', external: true },
        { name: 'Our team', href: 'https://docs.dexkit.com/welcome/the-startup/meet-the-team', external: true },
        { name: 'Brand material', href: 'https://docs.dexkit.com/welcome/the-startup/branding-and-press-kit', external: true },
      ]
    },
    { 
      title: 'Product', 
      href: '#',
      subItems: [
        { name: 'DexAppBuilder', href: '/dexappbuilder', external: false },
      ]
    },
    { 
      title: 'Solutions', 
      href: '#',
      subItems: [
        { name: 'DexSwap', href: '/dexswap', external: false },
        { name: 'DexNFTMarket', href: '/dexnftmarket', external: false },
        { name: 'DexNFTStore', href: '/dexnftstore', external: false },
        { name: 'DexGenerator', href: '/dexgenerator', external: false },
        { name: 'DexWallet', href: '/dexwallet', external: false },
        { name: 'DexExchangePro', href: '/dexexchangepro', external: false },
      ]
    },
    { 
      title: 'Our token', 
      href: '#',
      subItems: [
        { name: 'Tokenomics', href: 'https://docs.dexkit.com/welcome/our-token/tokenomics', external: true },
        { name: 'Utilities', href: 'https://docs.dexkit.com/welcome/our-token/utilities', external: true },
        { name: 'Contract addresses', href: 'https://docs.dexkit.com/welcome/our-token/contract-addresses', external: true },
        { name: 'Governance', href: 'https://docs.dexkit.com/welcome/our-token/governance', external: true },
      ]
    },
    { 
      title: 'Roadmap', 
      href: '/roadmap',
      subItems: []
    },
    { 
      title: 'Blog', 
      href: '/blog',
      subItems: []
    },
    { 
      title: 'Help center', 
      href: '#',
      subItems: [
        { name: 'User support', href: 'https://dexkit.atlassian.net/servicedesk/customer/portal/2', external: true },
        { name: 'Feature request', href: 'https://dexkit.canny.io/feature-requests', external: true },
        { name: 'White label custom request', href: 'mailto:info@dexkit.com', external: true },
      ]
    },
  ];

  return (
    <header className="py-6 px-4 bg-transparent">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="pl-8">
          <Image 
            src="/imgs/dexkit-logo-white.svg"
            alt="DexKit Logo" 
            width={150} 
            height={40} 
          />
        </Link>
        <nav className="flex-grow">
          <ul className="flex justify-center space-x-6 items-center">
            {menuItems.map((item) => (
              <li key={item.title} className="relative group">
                {item.subItems.length > 0 ? (
                  <>
                    <span className="text-white hover:text-orange-400 transition-colors duration-300 py-2 flex items-center cursor-default">
                      {item.title}
                      <span className="ml-1">
                        <i className="fas fa-chevron-down text-xs"></i>
                      </span>
                    </span>
                    <div className="absolute left-0 mt-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 invisible group-hover:visible">
                      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {item.subItems.map((subItem, index) => (
                          <div key={subItem.name}>
                            {subItem.external ? (
                              <a 
                                href={subItem.href}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-400 hover:text-white hover:font-bold transition-all duration-200"
                                role="menuitem"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {subItem.name}
                              </a>
                            ) : (
                              <Link 
                                href={subItem.href}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-400 hover:text-white hover:font-bold transition-all duration-200"
                                role="menuitem"
                              >
                                {subItem.name}
                              </Link>
                            )}
                            {index < item.subItems.length - 1 && (
                              <hr className="border-t border-gray-200" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link 
                    href={item.href}
                    className="text-white hover:text-orange-400 transition-colors duration-300 py-2 flex items-center"
                  >
                    {item.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}