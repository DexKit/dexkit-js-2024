'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import LocalizedLink from './LocalizedLink'
import { useIntl } from 'react-intl'
import LanguageSelector from './LanguageSelector';
import { FormattedMessage } from 'react-intl'

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
        { name: intl.formatMessage({ id: "header.missionVision" }), href: '/about/mission-vision-values', external: false, description: intl.formatMessage({ id: "header.missionVision.description" }) },
        { name: intl.formatMessage({ id: "header.ourTeam" }), href: '/about/our-team', external: false, description: intl.formatMessage({ id: "header.ourTeam.description" }) },
        { name: intl.formatMessage({ id: "header.brandMaterial" }), href: '/about/brand-material', external: false, description: intl.formatMessage({ id: "header.brandMaterial.description" }) },
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
        { name: intl.formatMessage({ id: "header.tokenomics" }), href: '/our-token/tokenomics', external: false, description: intl.formatMessage({ id: "header.tokenomics.description" }) },
        { name: intl.formatMessage({ id: "header.utilities" }), href: '/our-token/utilities', external: false, description: intl.formatMessage({ id: "header.utilities.description" }) },
        { name: intl.formatMessage({ id: "header.contractAddresses" }), href: '/our-token/contract-addresses', external: false, description: intl.formatMessage({ id: "header.contractAddresses.description" }) },
        { name: intl.formatMessage({ id: "header.governance" }), href: '/our-token/governance', external: false, description: intl.formatMessage({ id: "header.governance.description" }) },
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
        { name: intl.formatMessage({ id: "header.userSupport" }), href: 'https://dexkit.atlassian.net/servicedesk/customer/portal/2', external: true, description: intl.formatMessage({ id: "header.userSupport.description" }) },
        { name: intl.formatMessage({ id: "header.featureRequest" }), href: 'https://dexkit.canny.io/feature-requests', external: true, description: intl.formatMessage({ id: "header.featureRequest.description" }) },
        { name: intl.formatMessage({ id: "header.whiteLabel" }), href: 'mailto:info@dexkit.com', external: true, description: intl.formatMessage({ id: "header.whiteLabel.description" }) },
      ]
    },
  ];

  return (
    <>
      <header 
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollProgress > 0 ? 'bg-black bg-opacity-90 shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <LocalizedLink href="/" className="flex items-center">
            <Image 
              src="/imgs/dexkit-logo-white.svg" 
              alt="DexKit Logo" 
              width={isMobile ? 120 : 150} 
              height={isMobile ? 46 : 57} 
              className="h-auto"
            />
          </LocalizedLink>
          
          {isMobile ? (
            <div className="flex items-center">
              <LocalizedLink 
                href="/hire-a-dev" 
                className="hire-dev-button bg-orange-400 text-black px-3 py-1 rounded-lg font-semibold flex items-center mr-3 text-xs group whitespace-nowrap"
              >
                <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-full bg-gradient-to-r from-purple-600 to-orange-400 group-hover:translate-x-0 rounded-lg"></span>
                <span className="relative flex items-center whitespace-nowrap w-full justify-center">
                  <FormattedMessage id="header.hireADev" defaultMessage="Hire a Dev" />
                </span>
              </LocalizedLink>
              <button
                onClick={() => setIsMenuOpen(true)}
                className="text-white p-2"
                aria-label="Open menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          ) : (
            <>
              <nav className="hidden lg:block">
                <ul className="flex space-x-6 text-sm sm:text-base">
                  {menuItems.map((item) => (
                    <li key={item.title} className="relative">
                      {item.subItems.length > 0 ? (
                        <>
                          <span className="group relative">
                            <span className="text-white hover:text-orange-400 transition-colors duration-300 py-2 flex items-center cursor-pointer">
                              {item.title}
                              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </span>
                            <div className="absolute left-0 mt-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 invisible group-hover:visible">
                              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                {item.subItems.map((subItem) => (
                                  <LocalizedLink 
                                    key={subItem.name}
                                    href={subItem.external ? subItem.href : subItem.href}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-400 hover:text-white hover:font-bold transition-all duration-200"
                                    role="menuitem"
                                    aria-label={subItem.description}
                                  >
                                    {subItem.name}
                                  </LocalizedLink>
                                ))}
                              </div>
                            </div>
                          </span>
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
                <LocalizedLink 
                  href="/hire-a-dev" 
                  className="hire-dev-button pulse-effect bg-orange-400 text-black px-5 py-2 rounded-lg font-semibold flex items-center mr-4 text-sm sm:text-base group whitespace-nowrap min-w-fit max-w-[180px] justify-center"
                >
                  <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-full bg-gradient-to-r from-purple-600 to-orange-400 group-hover:translate-x-0 rounded-lg"></span>
                  <span className="relative flex items-center whitespace-nowrap w-full justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                    </svg>
                    <FormattedMessage id="header.hireADev" defaultMessage="Hire a Dev" />
                  </span>
                </LocalizedLink>
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
                      <summary className="text-gray-700 font-semibold cursor-pointer text-sm sm:text-base">{item.title}</summary>
                      <ul className="ml-4 mt-2">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.name} className="mb-2">
                            <LocalizedLink 
                              href={subItem.href}
                              className="text-gray-600 hover:text-orange-400 text-sm"
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
                      className="text-gray-700 font-semibold hover:text-orange-400 text-sm sm:text-base"
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