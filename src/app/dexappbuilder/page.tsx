'use client';

import { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';
import { FaTools } from 'react-icons/fa';

export default function DexAppBuilder() {
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
        { titleId: "dexappbuilder.tutorials.firstDApp", url: "https://docs.dexkit.com/defi-products/dexappbuilder/creating-my-first-app" },
        { titleId: "dexappbuilder.tutorials.managingTool", url: "https://docs.dexkit.com/defi-products/dexappbuilder/managing-this-tool" },
        { titleId: "dexappbuilder.tutorials.customSections", url: "https://docs.dexkit.com/defi-products/dexappbuilder/building-custom-sections" },
        { titleId: "dexappbuilder.tutorials.sellingDesigns", url: "https://docs.dexkit.com/defi-products/dexappbuilder/selling-my-designs" },
        { titleId: "dexappbuilder.tutorials.youtubePlaylist", url: "https://youtube.com/playlist?list=PLue98kEkVwitaUh2Xc5DF6Y_PoEUEkki8" }
    ];

    return (
      <div className="min-h-screen">
        <div className="text-white py-8 md:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <h1 className={`text-4xl md:text-6xl font-bold mb-4 md:mb-0 ${isMobile ? 'w-full' : 'md:w-1/2'} text-center md:text-left`}>
                <FormattedMessage id="dexappbuilder.title" />
              </h1>
              <p className={`text-lg md:text-xl ${isMobile ? 'w-full' : 'md:w-1/2'} text-center md:text-left`}>
                <FormattedMessage id="dexappbuilder.subtitle" />
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white text-black">
          <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
            <nav className="mb-8 overflow-x-auto">
              <ul className={`flex ${isMobile ? 'space-x-2' : 'space-x-4 md:space-x-6'} border-b border-gray-300 whitespace-nowrap`}>
                {['description', 'available networks', 'tutorials'].map((tab) => (
                  <li key={tab} className={`pb-2 ${activeTab === tab ? 'border-b-2 border-orange-500' : ''}`}>
                    <button 
                      onClick={() => setActiveTab(tab)} 
                      className={`${activeTab === tab ? 'text-orange-500' : 'text-gray-600'} ${isMobile ? 'text-xs' : 'text-sm md:text-base'}`}
                    >
                      <FormattedMessage id={`dexappbuilder.tabs.${tab}`} />
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="relative">
              <section id="description" className={`py-4 ${activeTab !== 'description' ? 'hidden' : ''}`}>
                <p className="mb-4 text-sm md:text-base">
                  <FormattedMessage id="dexappbuilder.description.paragraph1" />
                </p>
                <p className="mb-4 text-sm md:text-base">
                  <FormattedMessage id="dexappbuilder.description.paragraph2" />
                </p>
                <p className="mb-4 text-sm md:text-base">
                  <FormattedMessage id="dexappbuilder.description.paragraph3" />
                </p>
                <Link 
                  href="https://docs.dexkit.com/defi-products/dexappbuilder/overview" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-orange-500 hover:underline text-sm md:text-base"
                >
                  <FormattedMessage id="dexappbuilder.overview" />
                </Link>
              </section>

              <section id="available networks" className={`py-4 ${activeTab !== 'available networks' ? 'hidden' : ''}`}>
                <ul className="list-disc pl-5 space-y-2 text-sm md:text-base">
                  {["Ethereum (Mainnet, Goerli, Sepolia)", "Optimism", "Binance Chain (BNB) (Mainnet, testnet)", "Polygon", "Avalanche", "Arbitrum", "Fantom", "Base", "Blast L2 (Mainnet, testnet)", "Pulsechain"].map((network, index) => (
                    <li key={index}>
                      <FormattedMessage id={`dexappbuilder.networks.${index}`} defaultMessage={network} />
                    </li>
                  ))}
                </ul>
              </section>

              <section id="tutorials" className={`py-4 ${activeTab !== 'tutorials' ? 'hidden' : ''}`}>
                <ul className="list-disc pl-5 space-y-2">
                  {tutorials.map((tutorial, index) => (
                    <li key={index} className="text-sm md:text-base">
                      <Link 
                        href={tutorial.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-black hover:text-orange-500 hover:underline"
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
                href="https://dexappbuilder.dexkit.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center bg-orange-400 text-black py-2 px-4 sm:px-6 rounded hover:bg-orange-500 transition duration-300 text-sm sm:text-base"
              >
                <FaTools className="mr-2" />
                <FormattedMessage id="dexappbuilder.createDApp" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
}