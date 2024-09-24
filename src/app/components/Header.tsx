'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import LocalizedLink from './LocalizedLink'
import { useIntl } from 'react-intl'
import LanguageSelector from './LanguageSelector';

interface MenuItem {
  title: string;
  href: string;
  subItems: SubItem[];
}

interface SubItem {
  name: string;
  href: string;
  external: boolean;
  description?: string;
}

export default function Header() {
  const intl = useIntl();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 200;
      setScrollProgress(Math.min(scrollY / maxScroll, 1));
    };
    
    handleResize();
    handleScroll();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    const setHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${height}px`);
      }
    };

    setHeaderHeight();
    window.addEventListener('resize', setHeaderHeight);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', setHeaderHeight);
    };
  }, []);

  const menuItems: MenuItem[] = [
    { 
      title: intl.formatMessage({ id: "header.about" }), 
      href: '/about',
      subItems: [
        { name: intl.formatMessage({ id: "header.missionVision" }), href: '/about/mission-vision-values', external: false },
        { name: intl.formatMessage({ id: "header.ourTeam" }), href: '/about/our-team', external: false },
        { name: intl.formatMessage({ id: "header.brandMaterial" }), href: '/about/brand-material', external: false },
      ]
    },
    { 
      title: intl.formatMessage({ id: "header.product" }), 
      href: '#',
      subItems: [
        { name: 'DexAppBuilder', href: '/dexappbuilder', external: false, description: intl.formatMessage({ id: "product.dexappbuilder.description" }) },
      ]
    },
    { 
      title: intl.formatMessage({ id: "header.solutions" }), 
      href: '#',
      subItems: [
        { name: 'DexSwap', href: '/dexswap', external: false, description: intl.formatMessage({ id: "product.dexswap.description" }) },
        { name: 'DexNFTMarket', href: '/dexnftmarket', external: false, description: intl.formatMessage({ id: "product.dexnftmarket.description" }) },
        { name: 'DexNFTStore', href: '/dexnftstore', external: false, description: intl.formatMessage({ id: "product.dexnftstore.description" }) },
        { name: 'DexGenerator', href: '/dexgenerator', external: false, description: intl.formatMessage({ id: "product.dexgenerator.description" }) },
        { name: 'DexWallet', href: '/dexwallet', external: false, description: intl.formatMessage({ id: "product.dexwallet.description" }) },
        { name: 'DexExchangePro', href: '/dexexchangepro', external: false, description: intl.formatMessage({ id: "product.dexexchangepro.description" }) },
      ]
    },
    { 
      title: intl.formatMessage({ id: "header.ourToken" }), 
      href: '#',
      subItems: [
        { name: intl.formatMessage({ id: "header.tokenomics" }), href: '/our-token/tokenomics', external: false },
        { name: intl.formatMessage({ id: "header.utilities" }), href: '/our-token/utilities', external: false },
        { name: intl.formatMessage({ id: "header.contractAddresses" }), href: '/our-token/contract-addresses', external: false },
        { name: intl.formatMessage({ id: "header.governance" }), href: '/our-token/governance', external: false },
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
    <>
      <header 
        ref={headerRef}
        className={`py-6 px-4 fixed top-0 left-0 right-0 z-40 transition-all duration-300`}
        style={{
          backgroundColor: `rgba(0, 0, 0, ${scrollProgress * 0.9})`,
          backdropFilter: `blur(${scrollProgress * 5}px)`,
        }}
      >
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
            <>
              <nav className="hidden lg:block flex-grow">
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
                                  href={subItem.external ? subItem.href : subItem.href}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-400 hover:text-white hover:font-bold transition-all duration-200"
                                  role="menuitem"
                                  aria-label={subItem.description ? `${subItem.name}: ${subItem.description}` : subItem.name}
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
              <div className="flex items-center">
                <LanguageSelector textColor="text-white" />
              </div>
            </>
          )}
        </div>
      </header>
      <div style={{ height: 'var(--header-height)' }}></div>
      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div ref={menuRef} className="bg-white w-64 h-full overflow-y-auto fixed right-0 top-0 p-4 z-60">
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
            <div className="mt-4">
              <LanguageSelector textColor="text-black" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}