'use client';

import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import LocalizedLink from '../../components/LocalizedLink';
import { FaExternalLinkAlt } from 'react-icons/fa';

export default function GovernanceContent() {
  const intl = useIntl();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const pageTitle = intl.formatMessage({ id: 'governance.title' });
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
              {intl.formatMessage({ id: "governance.title" })}
            </h1>
            <p className={`text-base sm:text-lg md:text-xl ${isMobile ? 'w-full' : 'md:w-1/2'} text-center ${isMobile ? '' : 'md:text-left'}`}>
              {intl.formatMessage({ id: "governance.subtitle" })}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white text-black">
        <main className="container mx-auto px-4 py-8 md:py-12">
          <section className="mb-8 md:mb-12">
            <p className="text-base md:text-lg mb-4">
              {intl.formatMessage({ id: "governance.description" })}
            </p>
            <p className="text-base md:text-lg mb-4">
              {intl.formatMessage({ id: "governance.kitHolders" })}
            </p>
          </section>

          <section className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {intl.formatMessage({ id: "governance.participation.title" })}
            </h2>
            <p className="text-base md:text-lg mb-4">
              {intl.formatMessage({ id: "governance.participation.description" })}
            </p>
            <ul className="list-disc list-inside text-base md:text-lg mb-4">
              <li>
                {intl.formatMessage({ id: "governance.participation.requirement" })}
                <LocalizedLink href="/our-token/contract-addresses" className="text-orange-500 hover:underline">
                  {intl.formatMessage({ id: "governance.participation.supportedNetwork" })}
                </LocalizedLink>
              </li>
              <li>
                {intl.formatMessage({ id: "governance.participation.discord" })}
                <a href="https://discord.gg/99RPR7MKux" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">
                  {intl.formatMessage({ id: "governance.participation.discordServer" })}
                </a>
              </li>
            </ul>
          </section>

          <section className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {intl.formatMessage({ id: "governance.participate.title" })}
            </h2>
            <div className="bg-gray-100 rounded-lg shadow-lg p-6 md:p-8">
              <p className="text-base md:text-lg mb-4">
                {intl.formatMessage({ id: "governance.participate.description" })}
              </p>
              <a
                href="https://vote.dexkit.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-orange-400 text-black font-bold px-6 py-3 rounded-lg hover:bg-orange-500 transition-colors duration-300 text-lg"
              >
                <FaExternalLinkAlt className="mr-2" />
                {intl.formatMessage({ id: "governance.participate.button" })}
              </a>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
