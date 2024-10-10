'use client';

import { useState, useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Link from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';

export default function DexWallet() {
    const [activeTab, setActiveTab] = useState('description');
    const [isMobile, setIsMobile] = useState(false);
    const intl = useIntl();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const tutorials = [
        { titleId: "dexwallet.tutorials.firstWallet", url: "https://docs.dexkit.com/defi-products/dexwallet/creating-my-first-wallet" },
        { titleId: "dexwallet.tutorials.managingTool", url: "https://docs.dexkit.com/defi-products/dexwallet/managing-this-tool" },
    ];

    return (
      <div className="min-h-screen">
        <div className="text-white py-8 sm:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className={`flex flex-col ${isMobile ? '' : 'md:flex-row'} items-center justify-between`}>
              <h1 className={`text-4xl ${isMobile ? '' : 'sm:text-6xl'} font-bold mb-4 ${isMobile ? 'w-full' : 'md:mb-0 md:w-1/2'} text-center ${isMobile ? '' : 'md:text-left'} md:pl-12`}>
                <FormattedMessage id="dexwallet.title" defaultMessage="DexWallet" />
              </h1>
              <p className={`text-lg ${isMobile ? '' : 'sm:text-xl'} ${isMobile ? 'w-full' : 'md:w-1/2'} text-center ${isMobile ? '' : 'md:text-left'}`}>
                <FormattedMessage 
                  id="dexwallet.subtitle" 
                  defaultMessage="Your crypto companion: Manage your cryptocurrencies and NFTs with ease."
                />
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white text-black">
          <div className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
            <nav className="mb-8 overflow-x-auto">
              <ul className={`flex ${isMobile ? 'space-x-2' : 'space-x-4 sm:space-x-6'} border-b border-gray-300 whitespace-nowrap`}>
                {['description', 'tutorials'].map((tab) => (
                  <li key={tab} className={`pb-2 ${activeTab === tab ? 'border-b-2 border-orange-500' : ''}`}>
                    <button 
                      onClick={() => setActiveTab(tab)} 
                      className={`${activeTab === tab ? 'text-orange-500' : 'text-gray-600'} ${isMobile ? 'text-xs' : 'text-sm sm:text-base'}`}
                    >
                      {intl.formatMessage({ id: `dexwallet.tabs.${tab}` })}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="relative">
              <section id="description" className={`py-4 ${activeTab !== 'description' ? 'hidden' : ''}`}>
                <p className={`mb-4 ${isMobile ? 'text-sm' : 'text-sm sm:text-base'}`}>
                  <FormattedMessage 
                    id="dexwallet.description.paragraph1" 
                    defaultMessage="DexWallet is an easy-to-use crypto wallet that lets you manage all your cryptocurrencies and NFTs in one place. With DexWallet, you can manage your coins on all supported 0x networks, buy fiat coins on ramp, and even manage your Kittygotchi, DexKit's onchain pet."
                  />
                </p>
                <p className={`mb-4 ${isMobile ? 'text-sm' : 'text-sm sm:text-base'}`}>
                  <FormattedMessage 
                    id="dexwallet.description.paragraph2" 
                    defaultMessage="DexWallet provides a safe, simple, user-friendly, and comprehensive solution for cryptocurrency management, whether you are a beginner or an experienced user. It offers features like multi-chain support, easy token swaps, and NFT management, all in a secure and intuitive interface."
                  />
                </p>
                <Link 
                  href="https://docs.dexkit.com/defi-products/dexwallet/overview" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`text-orange-500 hover:underline ${isMobile ? 'text-sm' : 'text-sm sm:text-base'}`}
                >
                  <FormattedMessage id="dexwallet.overviewLink" defaultMessage="Discover DexWallet features" />
                </Link>
              </section>

              <section id="tutorials" className={`py-4 ${activeTab !== 'tutorials' ? 'hidden' : ''}`}>
                <ul className="list-disc pl-5 space-y-2">
                  {tutorials.map((tutorial, index) => (
                    <li key={index} className={`${isMobile ? 'text-sm' : 'text-sm sm:text-base'}`}>
                      <Link 
                        href={tutorial.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-black hover:text-orange-600 hover:underline"
                      >
                        <FormattedMessage id={tutorial.titleId} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="mt-8 text-left">
              <Link 
                href="https://dexappbuilder.dexkit.com/admin/quick-builder/wallet" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center bg-orange-400 text-black py-2 px-4 sm:px-6 rounded hover:bg-orange-500 transition duration-300 text-sm sm:text-base"
              >
                <FaExternalLinkAlt className="mr-2" />
                {intl.formatMessage({ id: "dexwallet.openSolution" })}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
}