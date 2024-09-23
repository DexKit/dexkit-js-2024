'use client';

import { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';

export default function DexExchangePro() {
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

    return (
      <div className="min-h-screen">
        <div className="text-white py-8 md:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-8 md:space-y-0 md:space-x-12">
              <h1 className={`text-4xl md:text-6xl font-bold mb-4 md:mb-0 ${isMobile ? 'w-full' : 'md:w-1/2'} text-center md:text-left`}>
                <FormattedMessage id="dexexchangepro.title" defaultMessage="DexExchangePro" />
              </h1>
              <p className={`text-lg md:text-xl ${isMobile ? 'w-full' : 'md:w-1/2'} text-center md:text-left`}>
                <FormattedMessage 
                  id="dexexchangepro.subtitle" 
                  defaultMessage="Your professional and secure decentralized exchange. No intermediaries, no hassle."
                />
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
                    <FormattedMessage id="common.description" defaultMessage="Description" />
                  </button>
                </li>
              </ul>
            </nav>

            <div className="relative">
              <section id="description" className={`py-4 ${activeTab !== 'description' ? 'hidden' : ''}`}>
                <p className="mb-4 text-sm sm:text-base">
                  <FormattedMessage 
                    id="dexexchangepro.description.paragraph1" 
                    defaultMessage="DexExchangePro is a decentralized exchange (DEX) white label product designed for businesses, entrepreneurs, and crypto enthusiasts who want to launch their own branded DEX. This powerful solution offers a professional-grade trading experience with advanced features, high liquidity, and robust security measures."
                  />
                </p>
                <p className="mb-4 text-sm sm:text-base">
                  <FormattedMessage 
                    id="dexexchangepro.description.paragraph2" 
                    defaultMessage="With DexExchangePro, users can enjoy seamless token swaps, liquidity provision, yield farming, and more, all within a customizable interface that reflects your brand identity. The platform supports multiple blockchain networks, ensuring wide accessibility and cross-chain functionality."
                  />
                </p>
                <Link 
                  href="https://docs.dexkit.com/defi-products/dexexchangepro/overview" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-orange-600 hover:underline text-sm sm:text-base"
                >
                  <FormattedMessage id="common.overview" defaultMessage="Overview" />
                </Link>
              </section>
            </div>

            <div className="mt-8">
              <Link 
                href="https://dexappbuilder.dexkit.com/admin/quick-builder/exchange" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center bg-orange-400 text-black py-2 px-4 sm:px-6 rounded hover:bg-orange-500 transition duration-300 text-sm sm:text-base"
              >
                <FaExternalLinkAlt className="mr-2" />
                <FormattedMessage id="dexexchangepro.deployNow" defaultMessage="Deploy now!" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
}