'use client';

import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';

export default function AirdropContent() {
  const intl = useIntl();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const pageTitle = intl.formatMessage({ id: 'airdrop.title' });
    document.title = `${pageTitle} | DexKit`;

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [intl]);

  return (
    <div className="min-h-screen">
      <div className="text-white py-8 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <h1 className={`text-4xl md:text-6xl font-bold mb-4 md:mb-0 ${isMobile ? 'w-full' : 'md:w-1/2'} text-center md:text-left`}>
              {intl.formatMessage({ id: "airdrop.title" })}
            </h1>
            <p className={`text-lg ${isMobile ? '' : 'sm:text-xl'} ${isMobile ? 'w-full' : 'md:w-1/2'} text-center ${isMobile ? '' : 'md:text-left'}`}>
              {intl.formatMessage({ id: "airdrop.subtitle" })}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white text-black">
        <main className="container mx-auto px-4 py-8 md:py-12">
          {/* TODO: content */}
        </main>
      </div>
    </div>
  );
} 