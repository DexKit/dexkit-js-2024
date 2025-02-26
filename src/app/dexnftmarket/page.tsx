'use client';

import { useState, useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Link from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';

export default function DexNFTMarket() {
    const [activeTab, setActiveTab] = useState('description');
    const [isMobile, setIsMobile] = useState(false);
    const intl = useIntl();

    useEffect(() => {
        const productTitle = intl.formatMessage({ id: 'product.dexnftmarket.title' });
        document.title = `${productTitle} | DexKit`;

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [intl]);

    return (
      <div className="min-h-screen">
        <div className="text-white py-8 sm:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className={`flex flex-col ${isMobile ? '' : 'md:flex-row'} items-center justify-between`}>
              <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${isMobile ? 'w-full' : 'md:mb-0 md:w-1/2'} text-center ${isMobile ? '' : 'md:text-left'}`}>
                <FormattedMessage id="dexnftmarket.title" defaultMessage="DexNFTMarket" />
              </h1>
              <p className={`text-base sm:text-lg md:text-xl ${isMobile ? 'w-full' : 'md:w-1/2'} text-center ${isMobile ? '' : 'md:text-left'}`}>
                <FormattedMessage 
                  id="dexnftmarket.subtitle" 
                  defaultMessage="Unlock the potential of your digital art and profit from your creativity."
                />
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white text-black">
          <div className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
            <nav className="mb-8 overflow-x-auto">
              <ul className="flex space-x-4 sm:space-x-6 border-b border-gray-300 whitespace-nowrap">
                {['description', 'features', 'tutorials'].map((tab) => (
                  <li key={tab} className={`pb-2 ${activeTab === tab ? 'border-b-2 border-orange-500' : ''}`}>
                    <button 
                      onClick={() => setActiveTab(tab)} 
                      className={`text-sm sm:text-base md:text-lg ${activeTab === tab ? 'text-orange-500' : 'text-gray-600'}`}
                    >
                      {intl.formatMessage({ id: `dexnftmarket.tabs.${tab}` })}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="relative">
              <section id="description" className={`py-4 ${activeTab !== 'description' ? 'hidden' : ''}`}>
                <p className="mb-4 text-sm sm:text-base md:text-lg">
                  <FormattedMessage 
                    id="dexnftmarket.description.paragraph1" 
                    defaultMessage="DexNFTMarket is a comprehensive solution for creating and managing your own NFT marketplace. This platform enables artists, collectors, and businesses to buy, sell, and trade digital assets in a secure and user-friendly environment."
                  />
                </p>
                <p className="mb-4 text-sm sm:text-base md:text-lg">
                  <FormattedMessage 
                    id="dexnftmarket.description.paragraph2" 
                    defaultMessage="With DexNFTMarket, you can showcase your digital creations, set pricing strategies, and connect with a global audience of NFT enthusiasts. The platform supports various NFT standards and provides tools for effective marketplace management."
                  />
                </p>
                <Link 
                  href="https://docs.dexkit.com/defi-products/dexnftmarket/overview" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-orange-500 hover:underline text-sm sm:text-base"
                >
                  <FormattedMessage id="dexnftmarket.overviewLink" defaultMessage="Explore DexNFTMarket features" />
                </Link>
              </section>

              <section id="features" className={`py-4 ${activeTab !== 'features' ? 'hidden' : ''}`}>
                <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base md:text-lg">
                  <li><FormattedMessage id="dexnftmarket.features.userFriendly" defaultMessage="User-friendly interface for easy navigation and management" /></li>
                  <li><FormattedMessage id="dexnftmarket.features.multiChain" defaultMessage="Multi-chain support for wider accessibility" /></li>
                  <li><FormattedMessage id="dexnftmarket.features.customization" defaultMessage="Customizable marketplace to reflect your brand" /></li>
                  <li><FormattedMessage id="dexnftmarket.features.analytics" defaultMessage="Built-in analytics for tracking sales and performance" /></li>
                  <li><FormattedMessage id="dexnftmarket.features.security" defaultMessage="Robust security measures to protect assets and transactions" /></li>
                </ul>
              </section>

              <section id="tutorials" className={`py-4 ${activeTab !== 'tutorials' ? 'hidden' : ''}`}>
                <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base md:text-lg">
                  <li>
                    <Link 
                      href="https://docs.dexkit.com/defi-products/dexnftmarket/creating-my-first-nft-marketplace" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-black hover:text-orange-600 hover:underline"
                    >
                      <FormattedMessage id="dexnftmarket.tutorials.firstMarketplace" defaultMessage="Creating my first NFT marketplace" />
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="https://docs.dexkit.com/defi-products/dexnftmarket/managing-listings" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-black hover:text-orange-600 hover:underline"
                    >
                      <FormattedMessage id="dexnftmarket.tutorials.managingListings" defaultMessage="Managing NFT listings" />
                    </Link>
                  </li>
                </ul>
              </section>
            </div>

            <div className="mt-8 text-left">
              <Link 
                href="https://dexappbuilder.dexkit.com/admin/create" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center bg-orange-400 text-black py-2 px-4 sm:px-6 rounded hover:bg-orange-500 transition duration-300 text-sm sm:text-base md:text-lg"
              >
                <FaExternalLinkAlt className="mr-2" />
                {intl.formatMessage({ id: "dexnftmarket.openSolution" })}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
}
