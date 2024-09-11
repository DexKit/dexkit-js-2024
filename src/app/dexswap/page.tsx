'use client';

import { useState } from 'react';

export default function DexSwap() {
    const [activeTab, setActiveTab] = useState('description');

    const tutorials = [
        { title: "Creating my first swap platform / DApp (Official docs)", url: "https://docs.dexkit.com/defi-products/dexswap/creating-my-first-swap" },
        { title: "Managing this tool", url: "https://docs.dexkit.com/defi-products/dexswap/managing-this-tool" },
        { title: "Deploying your DApp (YouTube video)", url: "https://youtube.com/watch?v=uMivD0Rikg8" },
    ];

    return (
      <div className="min-h-screen">
        <div className="text-white py-8 sm:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <h1 className="text-4xl sm:text-6xl font-bold mb-4 md:mb-0 md:w-1/2 text-center md:text-left">DexSwap</h1>
              <p className="text-lg sm:text-xl md:w-1/2 text-center md:text-left">
                Swap cryptocurrencies smarter and efficiently with real-time prices and optimized gas fees.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white text-black">
          <div className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
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
                  DexSwap is a <strong>decentralized swap platform and white label product that allows for easy swapping of
                  cryptocurrencies</strong>. By aggregating liquidity from multiple sources, <strong>it provides traders with the best
                  prices in real-time for each trading operation</strong>. Additionally, the platform is tweaked to optimize gas
                  fees, reducing dramatically slippage rates and transaction costs. DexSwap offers a range of features
                  such as swapping tokens in 0x liquidity pools, placing limit orders, and adding liquidity to pools to earn
                  fees. It works on multiple networks and simplifies the trading experience for users. Overall, DexSwap is
                  an innovative and powerful tool for traders looking to efficiently trade cryptocurrencies.
                </p>
                <a 
                  href="https://docs.dexkit.com/defi-products/dexswap/overview" 
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
                href="https://dexappbuilder.dexkit.com/admin/quick-builder/swap" 
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