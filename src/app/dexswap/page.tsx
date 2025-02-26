'use client';

import { useState, useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Link from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';

export default function DexSwap() {
    const [activeTab, setActiveTab] = useState('description');
    const [isMobile, setIsMobile] = useState(false);
    const intl = useIntl();

    useEffect(() => {
        const productTitle = intl.formatMessage({ id: 'product.dexswap.title' });
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

    const tutorials = [
        { titleId: "dexswap.tutorials.firstSwap", url: "https://docs.dexkit.com/defi-products/dexswap/creating-my-first-swap" },
        { titleId: "dexswap.tutorials.managingTool", url: "https://docs.dexkit.com/defi-products/dexswap/managing-this-tool" },
        { titleId: "dexswap.tutorials.deployingDApp", url: "https://youtube.com/watch?v=uMivD0Rikg8" },
    ];

    return (
      <div className="min-h-screen">
        <div className="text-white py-8 sm:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className={`flex flex-col ${isMobile ? '' : 'md:flex-row'} items-center justify-between`}>
              <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${isMobile ? 'w-full' : 'md:mb-0 md:w-1/2'} text-center ${isMobile ? '' : 'md:text-left'}`}>
                <FormattedMessage id="dexswap.title" defaultMessage="DexSwap" />
              </h1>
              <p className={`text-base sm:text-lg md:text-xl ${isMobile ? 'w-full' : 'md:w-1/2'} text-center ${isMobile ? '' : 'md:text-left'}`}>
                <FormattedMessage 
                  id="dexswap.subtitle" 
                  defaultMessage="Create your own token swap platform with just a few clicks."
                />
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white text-black">
          <div className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
            <nav className="mb-8 overflow-x-auto">
              <ul className="flex space-x-4 sm:space-x-6 border-b border-gray-300 whitespace-nowrap">
                {['description', 'tutorials'].map((tab) => (
                  <li key={tab} className={`pb-2 ${activeTab === tab ? 'border-b-2 border-orange-500' : ''}`}>
                    <button 
                      onClick={() => setActiveTab(tab)} 
                      className={`text-sm sm:text-base md:text-lg ${activeTab === tab ? 'text-orange-500' : 'text-gray-600'}`}
                    >
                      {intl.formatMessage({ id: `dexswap.tabs.${tab}` })}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="relative">
              <section id="description" className={`py-4 ${activeTab !== 'description' ? 'hidden' : ''}`}>
                <p className="mb-4 text-sm sm:text-base md:text-lg">
                  <FormattedMessage 
                    id="dexswap.description.paragraph1" 
                    defaultMessage="DexSwap is a powerful solution that allows you to create your own token swap platform without any coding knowledge. This tool enables businesses and individuals to launch a decentralized exchange (DEX) that facilitates token swaps across multiple blockchain networks."
                  />
                </p>
                <p className="mb-4 text-sm sm:text-base md:text-lg">
                  <FormattedMessage 
                    id="dexswap.description.paragraph2" 
                    defaultMessage="With an intuitive interface and customizable features, DexSwap makes it easy to provide token exchange services to your community or customers. The platform supports various token standards and offers competitive swap rates."
                  />
                </p>
                <Link 
                  href="https://docs.dexkit.com/defi-products/dexswap/overview" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-orange-500 hover:underline text-sm sm:text-base"
                >
                  <FormattedMessage id="dexswap.overviewLink" defaultMessage="Learn about DexSwap features" />
                </Link>
              </section>

              <section id="tutorials" className={`py-4 ${activeTab !== 'tutorials' ? 'hidden' : ''}`}>
                <ul className="list-disc pl-5 space-y-2">
                  {tutorials.map((tutorial, index) => (
                    <li key={index} className="text-sm sm:text-base md:text-lg">
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
                href="https://dexappbuilder.dexkit.com/admin/quick-builder/swap" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center bg-orange-400 text-black py-2 px-4 sm:px-6 rounded hover:bg-orange-500 transition duration-300 text-sm sm:text-base md:text-lg"
              >
                <FaExternalLinkAlt className="mr-2" />
                {intl.formatMessage({ id: "dexswap.openSolution" })}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
}
