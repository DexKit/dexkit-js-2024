'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!hasMounted) {
    return null;
  }

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
      href: '#',
      subItems: [
        { name: 'English', href: '/blog', external: false },
        { name: 'Español', href: '/blog-es', external: false },
      ]
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
        <Link href="/">
          <div style={{ width: isMobile ? '112px' : '150px', height: isMobile ? '30px' : '40px' }}>
            <Image 
              src="/imgs/dexkit-logo-white.svg"
              alt="DexKit Logo" 
              width={150}
              height={40}
              style={{ 
                width: '100%', 
                height: 'auto', 
                maxWidth: isMobile ? '112px' : '150px', 
                maxHeight: isMobile ? '30px' : '40px',
                objectFit: 'contain' 
              }}
            />
          </div>
        </Link>
        {isMobile ? (
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        ) : (
          <nav className="flex-grow">
            <ul className="flex justify-center space-x-6 items-center">
              {menuItems.map((item) => (
                <li key={item.title} className="relative group">
                  {item.subItems && item.subItems.length > 0 ? (
                    <>
                      <span className="text-white hover:text-orange-400 transition-colors duration-300 py-2 flex items-center cursor-default">
                        {item.title}
                        <span className="ml-1">
                          <i className="fas fa-chevron-down text-xs"></i>
                        </span>
                      </span>
                      <div className="absolute left-0 mt-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 invisible group-hover:visible">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                          {item.subItems.map((subItem) => (
                            <Link 
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-400 hover:text-white hover:font-bold transition-all duration-200"
                              role="menuitem"
                            >
                              {subItem.name}
                            </Link>
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
        )}
      </div>
      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div ref={menuRef} className="bg-white w-64 h-full overflow-y-auto absolute right-0 top-0 p-4">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <ul className="mt-8">
              {menuItems.map((item) => (
                <li key={item.title} className="mb-4">
                  {item.subItems.length > 0 ? (
                    <details>
                      <summary className="text-gray-700 font-semibold cursor-pointer">{item.title}</summary>
                      <ul className="ml-4 mt-2">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.name} className="mb-2">
                            {subItem.external ? (
                              <a 
                                href={subItem.href}
                                className="text-gray-600 hover:text-orange-400"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {subItem.name}
                              </a>
                            ) : (
                              <Link 
                                href={subItem.href}
                                className="text-gray-600 hover:text-orange-400"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <Link 
                      href={item.href}
                      className="text-gray-700 font-semibold hover:text-orange-400"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  )
}