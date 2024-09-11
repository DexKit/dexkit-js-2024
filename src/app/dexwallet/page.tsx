'use client';

import { useState } from 'react';

export default function DexWallet() {
    const [activeTab, setActiveTab] = useState('description');

    const tutorials = [
        { title: "Creating my first wallet", url: "https://docs.dexkit.com/defi-products/dexwallet/creating-my-first-wallet" },
        { title: "Managing this tool", url: "https://docs.dexkit.com/defi-products/dexwallet/managing-this-tool" },
    ];

    return (
      <div className="min-h-screen">
        <div className="text-white py-8 sm:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <h1 className="text-4xl sm:text-6xl font-bold mb-4 md:mb-0 md:w-1/2 text-center md:text-left">DexWallet</h1>
              <p className="text-lg sm:text-xl md:w-1/2 text-center md:text-left">
                Your crypto companion: Manage your cryptocurrencies and NFTs with ease.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white text-black">
          <div className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
            <nav className="mb-8">
              <ul className="flex space-x-4 sm:space-x-6 border-b border-gray-300">
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
                  DexWallet is an <strong>easy-to-use crypto wallet that lets you manage all your cryptocurrencies and NFTs in
                  one place</strong>. With the DexWallet, you can manage your coins on all supported 0x networks, buy fiat coins
                  on ramp, and even manage your Kittygotchi, DexKit&apos;s onchain pet. DexWallet provides a safe, simple,
                  user-friendly, and comprehensive solution for cryptocurrency management, whether you are a
                  beginner or an experienced user.
                </p>
                <a 
                  href="https://docs.dexkit.com/defi-products/dexwallet/overview" 
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

            <div className="mt-8">
              <a 
                href="https://dexappbuilder.dexkit.com/admin/quick-builder/wallet" 
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