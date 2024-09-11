'use client';

import { useState, useEffect } from 'react';

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
        { title: "Creating my first DApp", url: "https://docs.dexkit.com/defi-products/dexappbuilder/creating-my-first-app" },
        { title: "Managing this tool", url: "https://docs.dexkit.com/defi-products/dexappbuilder/managing-this-tool" },
        { title: "Building custom sections", url: "https://docs.dexkit.com/defi-products/dexappbuilder/building-custom-sections" },
        { title: "Selling my designs", url: "https://docs.dexkit.com/defi-products/dexappbuilder/selling-my-designs" },
        { title: "YouTube playlist", url: "https://youtube.com/playlist?list=PLue98kEkVwitaUh2Xc5DF6Y_PoEUEkki8" }
    ];

    return (
      <div className="min-h-screen">
        <div className="text-white py-8 md:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <h1 className={`text-4xl md:text-6xl font-bold mb-4 md:mb-0 ${isMobile ? 'w-full' : 'md:w-1/2'} text-center md:text-left`}>DexAppBuilder</h1>
              <p className={`text-lg md:text-xl ${isMobile ? 'w-full' : 'md:w-1/2'} text-center md:text-left`}>
                Empower your crypto app creation and launch your web3 business with guaranteed ownership.
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
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="relative">
              <section id="description" className={`py-4 ${activeTab !== 'description' ? 'hidden' : ''}`}>
                <p className="mb-4 text-sm md:text-base">
                  DexAppBuilder is a <strong>comprehensive no code and low code DApp builder that enables users to easily
                  create and launch their own branded Decentralized Applications (DApps) in the Web3 environment</strong>.
                </p>
                <p className="mb-4 text-sm md:text-base">
                  With DexAppBuilder, users can select the crypto features they want and easily add them to their Dapp
                  without the need for complicated coding: <strong>NFT Marketplace, Token and NFT generator, NFT online store
                  (like Shopify, but Web3), Swap, Exchange and Crypto wallet</strong>.
                </p>
                <p className="mb-4 text-sm md:text-base">
                  DexAppBuilder also provides <strong>customizable templates, intuitive drag-and-drop</strong> functionality, and
                  <strong>expert / community support</strong> to help users create a professional and polished DApp. Users can also
                  generate a unique NFT associated with their DApp to prove ownership and take advantage of
                  monetization opportunities.
                </p>
                <a 
                  href="https://docs.dexkit.com/defi-products/dexappbuilder/overview" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-orange-600 hover:underline text-sm md:text-base"
                >
                  Overview
                </a>
              </section>

              <section id="available networks" className={`py-4 ${activeTab !== 'available networks' ? 'hidden' : ''}`}>
                <ul className="list-disc pl-5 space-y-2 text-sm md:text-base">
                  {["Ethereum (Mainnet, Goerli, Sepolia)", "Optimism", "Binance Chain (BNB) (Mainnet and testnet)", "Polygon", "Avalanche", "Arbitrum", "Fantom", "Base", "Blast L2 (Mainnet and testnet)", "Pulsechain"].map((network, index) => (
                    <li key={index}>{network}</li>
                  ))}
                </ul>
              </section>

              <section id="tutorials" className={`py-4 ${activeTab !== 'tutorials' ? 'hidden' : ''}`}>
                <ul className="list-disc pl-5 space-y-2">
                  {tutorials.map((tutorial, index) => (
                    <li key={index} className="text-sm md:text-base">
                      <a 
                        href={tutorial.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-black hover:text-orange-600 hover:underline"
                      >
                        {tutorial.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className={`mt-8 ${isMobile ? 'text-center' : 'text-center md:text-left'}`}>
              <a 
                href="https://dexappbuilder.dexkit.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`inline-block bg-orange-500 text-black font-bold py-2 ${isMobile ? 'px-4' : 'px-6'} rounded hover:bg-orange-600 transition duration-300 ${isMobile ? 'text-sm' : 'text-sm md:text-base'}`}
              >
                Create my DApp
              </a>
            </div>
          </div>
        </div>
      </div>
    );
}