'use client';

import { useState } from 'react';

export default function DexNFTStore() {
    const [activeTab, setActiveTab] = useState('description');

    const tutorials = [
        { title: "Creating my first store", url: "https://docs.dexkit.com/defi-products/dexnftstore/creating-my-first-store" },
        { title: "Managing this tool", url: "https://docs.dexkit.com/defi-products/dexnftstore/managing-this-tool" },
    ];

    return (
      <div className="min-h-screen flex flex-col">
        <div className="text-white py-8 sm:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <h1 className="text-4xl sm:text-6xl font-bold mb-4 md:mb-0 md:w-1/2 text-center md:text-left">DexNFTStore</h1>
              <p className="text-lg sm:text-xl md:w-1/2 text-center md:text-left">
                Maximize your NFT sales with a Shopify-like platform for NFT creators.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white text-black flex-grow">
          <div className="container mx-auto px-4 py-4 md:py-6 max-w-4xl">
            <nav className="mb-8">
              <ul className="flex flex-wrap space-x-4 sm:space-x-6 border-b border-gray-300">
                {['description', 'tutorials'].map((tab) => (
                  <li key={tab} className={`pb-2 ${activeTab === tab ? 'border-b-2 border-orange-500' : ''}`}>
                    <button 
                      onClick={() => setActiveTab(tab)} 
                      className={`text-sm sm:text-base ${activeTab === tab ? 'text-orange-500' : 'text-gray-600'}`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="relative">
              <section id="description" className={`py-4 ${activeTab !== 'description' ? 'hidden' : ''}`}>
                <p className="mb-4 text-sm sm:text-base">
                  DexNFTStore is an innovative e-commerce platform that <strong>allows users to create their own online store
                  for selling NFTs</strong>. Similar to Shopify, it offers a range of features and tools to help users set up and
                  manage their online store, with a specific focus on NFTs (Non Fungible tokens).
                </p>
                <a 
                  href="https://docs.dexkit.com/defi-products/dexnftstore/overview" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-orange-600 hover:underline text-sm sm:text-base"
                >
                  Overview
                </a>
              </section>

              <section id="tutorials" className={`py-4 ${activeTab !== 'tutorials' ? 'hidden' : ''}`}>
                <ul className="list-disc pl-5 space-y-2">
                  {tutorials.map((tutorial, index) => (
                    <li key={index} className="text-sm sm:text-base">
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

            <div className="mt-4 mb-2 md:mb-4">
              <a 
                href="https://dexappbuilder.dexkit.com/admin/quick-builder/nft-store" 
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