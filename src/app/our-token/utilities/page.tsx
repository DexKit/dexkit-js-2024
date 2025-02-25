'use client';

import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import LocalizedLink from '../../components/LocalizedLink';

export default function UtilitiesContent() {
  const intl = useIntl();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const productTitle = intl.formatMessage({ id: 'utilities.title' });
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

  const utilities = [
    {
      text: intl.formatMessage({ id: 'utilities.hold1000' }),
      link: { text: intl.formatMessage({ id: 'utilities.contractAddresses' }), url: '/our-token/contract-addresses' }
    },
    { text: intl.formatMessage({ id: 'utilities.hold20' }) },
    { text: intl.formatMessage({ id: 'utilities.kittygotchi50' }) },
    { text: intl.formatMessage({ id: 'utilities.hold500' }) },
    {
      text: intl.formatMessage({ id: 'utilities.hold750' }),
      link: { text: 'DSWAP aggregator', url: 'https://swap.dexkit.com' }
    },
    { text: intl.formatMessage({ id: 'utilities.aggregator70' }) },
    {
      text: intl.formatMessage({ id: 'utilities.hold1000Snapshot' }),
      link: { text: 'Snapshot space', url: 'https://snapshot.org/#/dexkit.eth' }
    }
  ];

  return (
    <div className="min-h-screen">
        <div className="text-white py-8 md:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <h1 className={`text-4xl md:text-6xl font-bold mb-4 md:mb-0 ${isMobile ? 'w-full' : 'md:w-1/2'} text-center md:text-left`}>
                {intl.formatMessage({ id: "utilities.title" })}
            </h1>
            <p className={`text-lg sm:text-xl ${isMobile ? 'w-full' : 'md:w-1/2'} text-center ${isMobile ? '' : 'md:text-left'}`}>
                {intl.formatMessage({ id: "utilities.subtitle" })}
            </p>
            </div>
        </div>
        </div>

      <div className="bg-white text-black">
        <main className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
          <section className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              {intl.formatMessage({ id: "utilities.listTitle" })}
            </h2>
            <div className="bg-gray-100 rounded-lg shadow-lg p-6 md:p-8">
              <ul className="space-y-4">
                {utilities.map((utility, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-orange-400 mr-3 text-xl">•</span>
                    <span className="text-gray-800 text-sm sm:text-base">
                      {utility.text}
                      {utility.link && (
                        <>
                          {' '}
                          [
                          <LocalizedLink href={utility.link.url} className="text-orange-500 hover:underline">
                            {utility.link.text}
                          </LocalizedLink>
                          ]
                        </>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
