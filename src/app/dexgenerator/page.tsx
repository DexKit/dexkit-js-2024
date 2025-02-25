'use client';

import { useState, useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Link from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';

export default function DexGenerator() {
    const [activeTab, setActiveTab] = useState('description');
    const [isMobile, setIsMobile] = useState(false);
    const intl = useIntl();

    useEffect(() => {
        const productTitle = intl.formatMessage({ id: 'product.dexgenerator.title' });
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
        <div className="text-white py-8 md:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-0 ${isMobile ? 'w-full' : 'md:w-1/2'} text-center md:text-left`}>
                <FormattedMessage id="dexgenerator.title" defaultMessage="DexGenerator" />
              </h1>
              <p className={`text-base sm:text-lg md:text-xl ${isMobile ? 'w-full' : 'md:w-1/2'} text-center md:text-left`}>
                <FormattedMessage 
                  id="dexgenerator.subtitle" 
                  defaultMessage="Create and deploy NFT collections with ease, no coding required."
                />
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white text-black">
          <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
            <nav className="mb-8 overflow-x-auto">
              <ul className="flex space-x-4 sm:space-x-6 border-b border-gray-300 whitespace-nowrap">
                {['description', 'requirements', 'limitations', 'future updates', 'tutorials'].map((tab) => (
                  <li key={tab} className={`pb-2 ${activeTab === tab ? 'border-b-2 border-orange-500' : ''}`}>
                    <button 
                      onClick={() => setActiveTab(tab)} 
                      className={`text-sm sm:text-base ${activeTab === tab ? 'text-orange-500' : 'text-gray-600'}`}
                    >
                      {intl.formatMessage({ id: `dexgenerator.tabs.${tab}` })}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="relative">
              <section id="description" className={`py-4 ${activeTab !== 'description' ? 'hidden' : ''}`}>
                <p className="mb-4 text-sm sm:text-base md:text-lg">
                  <FormattedMessage 
                    id="dexgenerator.description.paragraph1" 
                    defaultMessage="DexGenerator is a powerful tool that allows you to create and deploy NFT collections without any coding knowledge. With an intuitive interface, you can upload your artwork, set collection parameters, and deploy directly to the blockchain."
                  />
                </p>
                <p className="mb-4 text-sm sm:text-base md:text-lg">
                  <FormattedMessage 
                    id="dexgenerator.description.paragraph2" 
                    defaultMessage="This solution supports various NFT standards and blockchain networks, making it accessible to creators regardless of their technical expertise. DexGenerator streamlines the process of bringing your digital art to the blockchain market."
                  />
                </p>
                <Link 
                  href="https://docs.dexkit.com/defi-products/dexgenerator/overview" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-orange-500 hover:underline text-sm sm:text-base"
                >
                  <FormattedMessage id="dexgenerator.overviewLink" defaultMessage="Learn more about DexGenerator" />
                </Link>
              </section>

              <section id="requirements" className={`py-4 ${activeTab !== 'requirements' ? 'hidden' : ''}`}>
                <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base md:text-lg">
                  {requirements.map((req, index) => (
                    <li key={index}>
                      <FormattedMessage id={req} />
                    </li>
                  ))}
                </ul>
              </section>

              <section id="limitations" className={`py-4 ${activeTab !== 'limitations' ? 'hidden' : ''}`}>
                <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base md:text-lg">
                  {limitations.map((limit, index) => (
                    <li key={index}>
                      <FormattedMessage id={limit} />
                    </li>
                  ))}
                </ul>
              </section>

              <section id="future updates" className={`py-4 ${activeTab !== 'future updates' ? 'hidden' : ''}`}>
                <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base md:text-lg">
                  {futureUpdates.map((update, index) => (
                    <li key={index}>
                      <FormattedMessage id={update} />
                    </li>
                  ))}
                </ul>
              </section>

              <section id="tutorials" className={`py-4 ${activeTab !== 'tutorials' ? 'hidden' : ''}`}>
                <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base md:text-lg">
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

            <div className="mt-8 text-left">
              <Link 
                href="https://dexappbuilder.dexkit.com/contract-wizard" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center bg-orange-400 text-black py-2 px-4 sm:px-6 rounded hover:bg-orange-500 transition duration-300 text-sm sm:text-base md:text-lg"
              >
                <FaExternalLinkAlt className="mr-2" />
                {intl.formatMessage({ id: "dexgenerator.openSolution" })}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
}
