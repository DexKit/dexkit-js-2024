'use client';

import { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';

export default function DexGenerator() {
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

    const requirements = [
        'dexgenerator.requirements.metamask',
        'dexgenerator.requirements.gasFees',
        'dexgenerator.requirements.artPieces',
        'dexgenerator.requirements.aiGenerated',
        'dexgenerator.requirements.aiCompletion'
    ];

    const limitations = [
        'dexgenerator.limitations.mintingLimit',
        'dexgenerator.limitations.imageSize'
    ];

    const futureUpdates = [
        'dexgenerator.futureUpdates.moreNetworks',
        'dexgenerator.futureUpdates.increaseMinting',
        'dexgenerator.futureUpdates.communityRequests'
    ];

    const tutorials = [
        { titleId: "dexgenerator.tutorials.firstCollection", url: "https://docs.dexkit.com/defi-products/dexgenerator/creating-my-first-collection" },
        { titleId: "dexgenerator.tutorials.thirdwebContracts", url: "https://youtube.com/playlist?list=PLue98kEkVwiuKad1hQs11rWiGUkyl0nq5" }
    ];

    return (
      <div className="min-h-screen">
        <div className="text-white py-8 sm:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className={`flex flex-col ${isMobile ? '' : 'md:flex-row'} items-center justify-between`}>
              <h1 className={`text-4xl ${isMobile ? '' : 'sm:text-6xl'} font-bold mb-4 ${isMobile ? 'w-full' : 'md:mb-0 md:w-1/2'} text-center ${isMobile ? '' : 'md:text-left'}`}>
                <FormattedMessage id="dexgenerator.title" defaultMessage="DexGenerator" />
              </h1>
              <p className={`text-lg ${isMobile ? '' : 'sm:text-xl'} ${isMobile ? 'w-full' : 'md:w-1/2'} text-center ${isMobile ? '' : 'md:text-left'}`}>
                <FormattedMessage 
                  id="dexgenerator.subtitle" 
                  defaultMessage="Deploy open-source, secure smart contracts on the blockchain with ease, and seamlessly integrate them with prebuilt user interfaces."
                />
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white text-black">
          <div className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
            <nav className="mb-8 overflow-x-auto">
              <ul className={`flex ${isMobile ? 'space-x-2' : 'space-x-4 sm:space-x-6'} border-b border-gray-300 whitespace-nowrap`}>
                {['description', 'requirements', 'limitations', 'future updates', 'tutorials'].map((tab) => (
                  <li key={tab} className={`pb-2 ${activeTab === tab ? 'border-b-2 border-orange-500' : ''}`}>
                    <button 
                      onClick={() => setActiveTab(tab)} 
                      className={`${activeTab === tab ? 'text-orange-500' : 'text-gray-600'} ${isMobile ? 'text-xs' : 'text-sm sm:text-base'}`}
                    >
                      <FormattedMessage id={`dexgenerator.tabs.${tab}`} defaultMessage={tab} />
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="relative">
              <section id="description" className={`py-4 ${activeTab !== 'description' ? 'hidden' : ''}`}>
                <p className={`mb-4 ${isMobile ? 'text-sm' : 'text-sm sm:text-base'}`}>
                  <FormattedMessage 
                    id="dexgenerator.description.paragraph1" 
                    defaultMessage="DexGenerator is a powerful tool designed to simplify the process of creating and deploying smart contracts on various blockchain networks. It provides a user-friendly interface for generating secure, audited smart contracts without requiring extensive coding knowledge."
                  />
                </p>
                <p className={`mb-4 ${isMobile ? 'text-sm' : 'text-sm sm:text-base'}`}>
                  <FormattedMessage 
                    id="dexgenerator.description.paragraph2" 
                    defaultMessage="With DexGenerator, users can easily create custom tokens, NFTs, and other blockchain-based assets. The platform offers a range of pre-built templates and customization options, allowing users to tailor their smart contracts to specific needs. Additionally, DexGenerator provides seamless integration with pre-built user interfaces, making it easy to create complete decentralized applications (DApps) with minimal effort."
                  />
                </p>
                <Link 
                  href="https://docs.dexkit.com/defi-products/dexgenerator/overview" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`text-orange-600 hover:underline ${isMobile ? 'text-sm' : 'text-sm sm:text-base'}`}
                >
                  <FormattedMessage id="common.overview" defaultMessage="Overview" />
                </Link>
              </section>

              <section id="requirements" className={`py-4 ${activeTab !== 'requirements' ? 'hidden' : ''}`}>
                <ul className={`list-disc pl-5 space-y-2 ${isMobile ? 'text-sm' : 'text-sm sm:text-base'}`}>
                  {requirements.map((req, index) => (
                    <li key={index}>
                      <FormattedMessage id={req} />
                    </li>
                  ))}
                </ul>
              </section>

              <section id="limitations" className={`py-4 ${activeTab !== 'limitations' ? 'hidden' : ''}`}>
                <ul className={`list-disc pl-5 space-y-2 ${isMobile ? 'text-sm' : 'text-sm sm:text-base'}`}>
                  {limitations.map((limit, index) => (
                    <li key={index}>
                      <FormattedMessage id={limit} />
                    </li>
                  ))}
                </ul>
              </section>

              <section id="future updates" className={`py-4 ${activeTab !== 'future updates' ? 'hidden' : ''}`}>
                <ul className={`list-disc pl-5 space-y-2 ${isMobile ? 'text-sm' : 'text-sm sm:text-base'}`}>
                  {futureUpdates.map((update, index) => (
                    <li key={index}>
                      <FormattedMessage id={update} />
                    </li>
                  ))}
                </ul>
              </section>

              <section id="tutorials" className={`py-4 ${activeTab !== 'tutorials' ? 'hidden' : ''}`}>
                <ul className={`list-disc pl-5 space-y-2 ${isMobile ? 'text-sm' : 'text-sm sm:text-base'}`}>
                  {tutorials.map((tutorial, index) => (
                    <li key={index}>
                      <Link 
                        href={tutorial.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-black hover:text-orange-600 hover:underline"
                      >
                        <FormattedMessage id={tutorial.titleId} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className={`mt-8 ${isMobile ? 'text-center' : ''}`}>
              <Link 
                href="https://dexappbuilder.dexkit.com/contract-wizard" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`inline-flex items-center bg-orange-400 text-black py-2 ${isMobile ? 'px-4' : 'px-4 sm:px-6'} rounded hover:bg-orange-500 transition duration-300 ${isMobile ? 'text-sm' : 'text-sm sm:text-base'}`}
              >
                <FaExternalLinkAlt className="mr-2" />
                <FormattedMessage id="dexgenerator.openSolution" defaultMessage="Open solution" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
}