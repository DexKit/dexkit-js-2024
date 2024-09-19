'use client';

import { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';

export default function DexNFTStore() {
    const [activeTab, setActiveTab] = useState('description');
    const [isMobile, setIsMobile] = useState(false);

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
        { titleId: "dexnftstore.tutorials.firstStore", url: "https://docs.dexkit.com/defi-products/dexnftstore/creating-my-first-store" },
        { titleId: "dexnftstore.tutorials.managingTool", url: "https://docs.dexkit.com/defi-products/dexnftstore/managing-this-tool" },
    ];

    return (
      <div className="min-h-screen flex flex-col">
        <div className="text-white py-8 sm:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className={`flex flex-col ${isMobile ? '' : 'md:flex-row'} items-center justify-between`}>
              <h1 className={`text-4xl ${isMobile ? '' : 'sm:text-6xl'} font-bold mb-4 ${isMobile ? 'w-full' : 'md:mb-0 md:w-1/2'} text-center ${isMobile ? '' : 'md:text-left'}`}>
                <FormattedMessage id="dexnftstore.title" defaultMessage="DexNFTStore" />
              </h1>
              <p className={`text-lg ${isMobile ? '' : 'sm:text-xl'} ${isMobile ? 'w-full' : 'md:w-1/2'} text-center ${isMobile ? '' : 'md:text-left'}`}>
                <FormattedMessage 
                  id="dexnftstore.subtitle" 
                  defaultMessage="Maximize your NFT sales with a Shopify-like platform for NFT creators."
                />
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white text-black flex-grow">
          <div className="container mx-auto px-4 py-4 md:py-6 max-w-4xl">
            <nav className="mb-8 overflow-x-auto">
              <ul className={`flex ${isMobile ? 'space-x-2' : 'space-x-4 sm:space-x-6'} border-b border-gray-300 whitespace-nowrap`}>
                {['description', 'tutorials'].map((tab) => (
                  <li key={tab} className={`pb-2 ${activeTab === tab ? 'border-b-2 border-orange-500' : ''}`}>
                    <button 
                      onClick={() => setActiveTab(tab)} 
                      className={`${activeTab === tab ? 'text-orange-500' : 'text-gray-600'} ${isMobile ? 'text-xs' : 'text-sm sm:text-base'}`}
                    >
                      <FormattedMessage id={`dexnftstore.tabs.${tab}`} defaultMessage={tab} />
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="relative">
              <section id="description" className={`py-4 ${activeTab !== 'description' ? 'hidden' : ''}`}>
                <p className={`mb-4 ${isMobile ? 'text-sm' : 'text-sm sm:text-base'}`}>
                  <FormattedMessage 
                    id="dexnftstore.description.paragraph1" 
                    defaultMessage="DexNFTStore is an innovative e-commerce platform that allows users to create their own online store for selling NFTs. Similar to Shopify, it offers a range of features and tools to help users set up and manage their online store, with a specific focus on NFTs (Non Fungible Tokens)."
                  />
                </p>
                <p className={`mb-4 ${isMobile ? 'text-sm' : 'text-sm sm:text-base'}`}>
                  <FormattedMessage 
                    id="dexnftstore.description.paragraph2" 
                    defaultMessage="With DexNFTStore, creators can easily showcase their digital art, collectibles, and other NFTs in a professional and customizable storefront. The platform provides tools for inventory management, payment processing, and customer engagement, all tailored to the unique needs of NFT sales."
                  />
                </p>
                <Link 
                  href="https://docs.dexkit.com/defi-products/dexnftstore/overview" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`text-orange-600 hover:underline ${isMobile ? 'text-sm' : 'text-sm sm:text-base'}`}
                >
                  <FormattedMessage id="common.overview" defaultMessage="Overview" />
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

            <div className={`mt-4 mb-2 md:mb-4 ${isMobile ? 'text-center' : ''}`}>
              <Link 
                href="https://dexappbuilder.dexkit.com/admin/quick-builder/nft-store" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`inline-block bg-orange-500 text-black font-bold py-2 ${isMobile ? 'px-4' : 'px-4 sm:px-6'} rounded hover:bg-orange-600 transition duration-300 ${isMobile ? 'text-sm' : 'text-sm sm:text-base'}`}
              >
                <FormattedMessage id="dexnftstore.openSolution" defaultMessage="Open solution" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
}