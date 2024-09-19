'use client';

import { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';

export default function DexSwap() {
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
        { titleId: "dexswap.tutorials.firstSwap", url: "https://docs.dexkit.com/defi-products/dexswap/creating-my-first-swap" },
        { titleId: "dexswap.tutorials.managingTool", url: "https://docs.dexkit.com/defi-products/dexswap/managing-this-tool" },
        { titleId: "dexswap.tutorials.deployingDApp", url: "https://youtube.com/watch?v=uMivD0Rikg8" },
    ];

    return (
      <div className="min-h-screen">
        <div className="text-white py-8 sm:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className={`flex flex-col ${isMobile ? '' : 'md:flex-row'} items-center justify-between`}>
              <h1 className={`text-4xl ${isMobile ? '' : 'sm:text-6xl'} font-bold mb-4 ${isMobile ? 'w-full' : 'md:mb-0 md:w-1/2'} text-center ${isMobile ? '' : 'md:text-left'}`}>
                <FormattedMessage id="dexswap.title" defaultMessage="DexSwap" />
              </h1>
              <p className={`text-lg ${isMobile ? '' : 'sm:text-xl'} ${isMobile ? 'w-full' : 'md:w-1/2'} text-center ${isMobile ? '' : 'md:text-left'}`}>
                <FormattedMessage 
                  id="dexswap.subtitle" 
                  defaultMessage="Swap cryptocurrencies smarter and efficiently with real-time prices and optimized gas fees."
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
                      <FormattedMessage id={`dexswap.tabs.${tab}`} defaultMessage={tab} />
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="relative">
              <section id="description" className={`py-4 ${activeTab !== 'description' ? 'hidden' : ''}`}>
                <p className={`mb-4 ${isMobile ? 'text-sm' : 'text-sm sm:text-base'}`}>
                  <FormattedMessage 
                    id="dexswap.description.paragraph1" 
                    defaultMessage="DexSwap is a decentralized swap platform and white label product that allows for easy swapping of cryptocurrencies. By aggregating liquidity from multiple sources, it provides traders with the best prices in real-time for each trading operation. Additionally, the platform is tweaked to optimize gas fees, dramatically reducing slippage rates and transaction costs."
                  />
                </p>
                <p className={`mb-4 ${isMobile ? 'text-sm' : 'text-sm sm:text-base'}`}>
                  <FormattedMessage 
                    id="dexswap.description.paragraph2" 
                    defaultMessage="DexSwap offers a range of features such as swapping tokens in 0x liquidity pools, placing limit orders, and adding liquidity to pools to earn fees. It works on multiple networks and simplifies the trading experience for users. Overall, DexSwap is an innovative and powerful tool for traders looking to efficiently trade cryptocurrencies."
                  />
                </p>
                <Link 
                  href="https://docs.dexkit.com/defi-products/dexswap/overview" 
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

            <div className={`mt-8 ${isMobile ? 'text-center' : ''}`}>
              <Link 
                href="https://dexappbuilder.dexkit.com/admin/quick-builder/swap" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`inline-block bg-orange-500 text-black font-bold py-2 ${isMobile ? 'px-4' : 'px-4 sm:px-6'} rounded hover:bg-orange-600 transition duration-300 ${isMobile ? 'text-sm' : 'text-sm sm:text-base'}`}
              >
                <FormattedMessage id="dexswap.openSolution" defaultMessage="Open solution" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
}