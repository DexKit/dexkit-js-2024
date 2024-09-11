'use client';

import { useState } from 'react';

export default function DexNFTMarket() {
    const [activeTab, setActiveTab] = useState('description');

    return (
      <div className="min-h-screen">
        <div className="text-white py-8 sm:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <h1 className="text-4xl sm:text-6xl font-bold mb-4 md:mb-0 md:w-1/2 text-center md:text-left">DexNFTMarket</h1>
              <p className="text-lg sm:text-xl md:w-1/2 text-center md:text-left">
                Unlock the potential of your digital art and profit from your creativity.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white text-black">
          <div className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
            <nav className="mb-8">
              <ul className="flex flex-wrap space-x-4 sm:space-x-6 border-b border-gray-300">
                <li className={`pb-2 ${activeTab === 'description' ? 'border-b-2 border-orange-500' : ''}`}>
                  <button 
                    onClick={() => setActiveTab('description')} 
                    className={`text-sm sm:text-base ${activeTab === 'description' ? 'text-orange-500' : 'text-gray-600'}`}
                  >
                    Description
                  </button>
                </li>
              </ul>
            </nav>

            <div className="relative">
              <section id="description" className={`py-4 ${activeTab !== 'description' ? 'hidden' : ''}`}>
                <p className="mb-4 text-sm sm:text-base">
                  DexNFTMarket is a <strong>marketplace white label product designed for artists, photographers, musicians,
                  NFT enthusiasts, traders, token owners, Web3 entrepreneurs, and more to sell, trade, and manage their
                  NFT collections</strong>. The platform offers an intuitive and user-friendly interface with powerful tools for
                  listing, selling and managing NFTs. With exceptional speed, DexNFTMarket ensures that your NFTs rank
                  high on Google and are easily discovered and shared on social media. The platform also provides fair
                  fees, prioritizes security updates and transparency and is powered by cutting-edge blockchain
                  technology.
                </p>
                <a 
                  href="https://docs.dexkit.com/defi-products/dexnftmarket/overview" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-orange-600 hover:underline text-sm sm:text-base"
                >
                  Overview
                </a>
              </section>
            </div>

            <div className="mt-8">
              <a 
                href="https://dexappbuilder.dexkit.com/admin/create" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block bg-orange-500 text-black font-bold py-2 px-4 sm:px-6 rounded hover:bg-orange-600 transition duration-300 text-sm sm:text-base"
              >
                Open solution
              </a>
            </div>
          </div>
        </div>
      </div>
    );
}