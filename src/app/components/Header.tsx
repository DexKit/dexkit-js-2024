'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import LocalizedLink from './LocalizedLink'
import { useIntl } from 'react-intl'
import LanguageSelector from './LanguageSelector';

export default function Header() {
  const intl = useIntl();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

  const menuItems = [
    { 
      title: intl.formatMessage({ id: "header.about" }), 
      href: '#',
      subItems: [
        { name: intl.formatMessage({ id: "header.missionVision" }), href: 'https://docs.dexkit.com/welcome/the-startup/mission-vision-and-values', external: true },
        { name: intl.formatMessage({ id: "header.ourTeam" }), href: 'https://docs.dexkit.com/welcome/the-startup/meet-the-team', external: true },
        { name: intl.formatMessage({ id: "header.brandMaterial" }), href: 'https://docs.dexkit.com/welcome/the-startup/branding-and-press-kit', external: true },
      ]
    },
    { 
      title: intl.formatMessage({ id: "header.product" }), 
      href: '#',
      subItems: [
        { name: 'DexAppBuilder', href: '/dexappbuilder', external: false },
      ]
    },
    { 
      title: intl.formatMessage({ id: "header.solutions" }), 
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
      title: intl.formatMessage({ id: "header.ourToken" }), 
      href: '#',
      subItems: [
        { name: intl.formatMessage({ id: "header.tokenomics" }), href: 'https://docs.dexkit.com/welcome/our-token/tokenomics', external: true },
        { name: intl.formatMessage({ id: "header.utilities" }), href: 'https://docs.dexkit.com/welcome/our-token/utilities', external: true },
        { name: intl.formatMessage({ id: "header.contractAddresses" }), href: 'https://docs.dexkit.com/welcome/our-token/contract-addresses', external: true },
        { name: intl.formatMessage({ id: "header.governance" }), href: 'https://docs.dexkit.com/welcome/our-token/governance', external: true },
      ]
    },
    { 
      title: intl.formatMessage({ id: "header.roadmap" }), 
      href: '/roadmap',
      subItems: []
    },
    { 
      title: intl.formatMessage({ id: "header.blog" }), 
      href: '/blog',
      subItems: []
    },
    { 
      title: intl.formatMessage({ id: "header.helpCenter" }), 
      href: '#',
      subItems: [
        { name: intl.formatMessage({ id: "header.userSupport" }), href: 'https://dexkit.atlassian.net/servicedesk/customer/portal/2', external: true },
        { name: intl.formatMessage({ id: "header.featureRequest" }), href: 'https://dexkit.canny.io/feature-requests', external: true },
        { name: intl.formatMessage({ id: "header.whiteLabel" }), href: 'mailto:info@dexkit.com', external: true },
      ]
    },
  ];

  return (
    <header className="py-6 px-4 bg-transparent">
      <div className="container mx-auto flex justify-between items-center">
        <LocalizedLink href="/">
          <div className="w-[112px] h-[30px] md:w-[150px] md:h-[40px]">
            <Image 
              src="/imgs/dexkit-logo-white.svg"
              alt="DexKit Logo" 
              width={150}
              height={40}
              priority
              className="w-full h-auto object-contain"
            />
          </div>
        </LocalizedLink>
        {isMobile ? (
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        ) : (
          <nav className="hidden md:block flex-grow">
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
                            <LocalizedLink 
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-400 hover:text-white hover:font-bold transition-all duration-200"
                              role="menuitem"
                            >
                              {subItem.name}
                            </LocalizedLink>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <LocalizedLink 
                      href={item.href}
                      className="text-white hover:text-orange-400 transition-colors duration-300 py-2 flex items-center"
                    >
                      {item.title}
                    </LocalizedLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}
        <div className="flex items-center">
          <LanguageSelector />
          {/* Aquí puedes añadir otros elementos que quieras a la derecha */}
        </div>
      </div>
      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div ref={menuRef} className="bg-white w-64 h-full overflow-y-auto absolute right-0 top-0 p-4">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 text-gray-600"
              aria-label="Close menu"
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
                            <LocalizedLink 
                              href={subItem.href}
                              className="text-gray-600 hover:text-orange-400"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {subItem.name}
                            </LocalizedLink>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <LocalizedLink 
                      href={item.href}
                      className="text-gray-700 font-semibold hover:text-orange-400"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.title}
                    </LocalizedLink>
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