'use client';

import { useState } from 'react';

export default function DexExchangePro() {
    const [activeTab, setActiveTab] = useState('description');

    const tutorials = [
        { title: "Solution overview (Official docs)", url: "https://docs.dexkit.com/defi-products/dexexchangepro/overview" },
        { title: "Deploy your Decentralized Exchange onchain app (YouTube)", url: "https://youtube.com/watch?v=0D00j-KIJ00" }
    ];

    return (
      <div className="min-h-screen">
        <div className="text-white py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
              <h1 className="text-5xl lg:text-6xl font-bold mb-4 lg:mb-0 lg:mr-8">DexExchangePro</h1>
              <p className="text-xl lg:flex-1">
                Your professional and secure decentralized exchange. No intermediaries, no hassle.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white text-black">
          <div className="container mx-auto px-4 py-12 max-w-4xl">
            <nav className="mb-8">
              <ul className="flex space-x-6 border-b border-gray-300">
                {['description', 'tutorials'].map((tab) => (
                  <li key={tab} className={`pb-2 ${activeTab === tab ? 'border-b-2 border-orange-500' : ''}`}>
                    <button 
                      onClick={() => setActiveTab(tab)} 
                      className={activeTab === tab ? 'text-orange-500' : 'text-gray-600'}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="relative">
              <section id="description" className={`py-4 ${activeTab !== 'description' ? 'hidden' : ''}`}>
                <p className="mb-4">
                  DexExchangePro is a <strong>decentralized exchange white label product that enables traders to securely
                  trade cryptocurrencies directly from their wallets without intermediaries</strong>. Provides traders with
                  complete control over their funds during the trading process. The platform offers an advanced view
                  feature, real-time charts, order books, and trading volumes for data-driven decisions. It supports
                  multiple blockchains, including Ethereum, Binance Chain, Polygon, and more to come. Traders can
                  easily diversify their portfolios and take advantage of opportunities in different markets. Enabling
                  traders to place zero-fee limit orders and easily create a wallet using their Google, Discord, or Twitter /
                  X profiles. DexExchangePro offers a seamless and secure trading experience.
                </p>
                <a 
                  href="https://docs.dexkit.com/defi-products/dexexchangepro/overview" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-orange-600 hover:underline"
                >
                  Overview
                </a>
              </section>

              <section id="tutorials" className={`py-4 ${activeTab !== 'tutorials' ? 'hidden' : ''}`}>
                <ul className="list-disc pl-5 space-y-2">
                  {tutorials.map((tutorial, index) => (
                    <li key={index} className="text-lg">
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
                href="https://dexappbuilder.dexkit.com/admin/quick-builder/exchange" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block bg-orange-500 text-black font-bold py-2 px-6 rounded hover:bg-orange-600 transition duration-300"
              >
                Deploy now
              </a>
            </div>
          </div>
        </div>
      </div>
    );
}