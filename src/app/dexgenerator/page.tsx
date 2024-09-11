'use client';

import { useState } from 'react';

export default function DexGenerator() {
    const [activeTab, setActiveTab] = useState('description');

    const requirements = [
        <>
          <a href="https://metamask.io" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">Metamask</a> or any other Web3 wallet. We&apos;re including <a href="https://magic.link" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">Magic wallet compatibility</a>, so basically any internet user can create a wallet without downloading any app;
        </>,
        "Funds for gas fees (basic gas for any enabled network when on-chain interactions are required);",
        "The art pieces you're about to mint, your settled idea or any other resource you need;",
        <>
          Get 50 AI-generated monthly images holding 1,000 <a href="https://docs.dexkit.com/welcome/our-token/contract-addresses" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">$KIT</a> (optional). If you consider a premium plan, you can contact us through our <a href="https://discord.gg/invite/dexkit-official-943552525217435649" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">Discord server</a> and we will set a fair price for your needs.
        </>,
        <>
          <a href="https://docs.dexkit.com/defi-products/dexappbuilder/ai-completion" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">AI completion tool</a> (for text) can be used with crypto top-up
        </>
    ];

    const limitations = [
        "There is an initial minting limit of 30 pieces per NFT and it is recommended that the first minting session contain no more than 30 pieces. You can add more items after first minting to fit your needs;",
        "2 MB (2048 KB) images. We will increase this spec on demand."
    ];

    const futureUpdates = [
        <>More <a href="https://docs.dexkit.com/defi-products/dexappbuilder/available-networks" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">available networks</a>;</>,
        "Increase digital collectibles initial minting from 30 to N;",
        <>The needed ones to keep this platform updated and <a href="https://dexkit.canny.io/feature-requests" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">feature requests</a> from community.</>
    ];

    const tutorials = [
        { title: "Creating my first NFT collection (Official docs)", url: "https://docs.dexkit.com/defi-products/dexgenerator/creating-my-first-collection" },
        { title: "Deploying different Thirdweb contracts (YouTube playlist)", url: "https://youtube.com/playlist?list=PLue98kEkVwiuKad1hQs11rWiGUkyl0nq5" }
    ];

    return (
      <div className="min-h-screen">
        <div className="text-white py-8 sm:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <h1 className="text-4xl sm:text-6xl font-bold mb-4 md:mb-0 md:w-1/2 text-center md:text-left">DexGenerator</h1>
              <p className="text-lg sm:text-xl md:w-1/2 text-center md:text-left">
                Deploy open-source, secure smart contracts on the blockchain with ease, and seamlessly integrate them with prebuilt user interfaces.
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
                    Description
                  </button>
                </li>
                <li className={`pb-2 ${activeTab === 'requirements' ? 'border-b-2 border-orange-500' : ''}`}>
                  <button 
                    onClick={() => setActiveTab('requirements')} 
                    className={`text-sm sm:text-base ${activeTab === 'requirements' ? 'text-orange-500' : 'text-gray-600'}`}
                  >
                    Requirements
                  </button>
                </li>
                <li className={`pb-2 ${activeTab === 'limitations' ? 'border-b-2 border-orange-500' : ''}`}>
                  <button 
                    onClick={() => setActiveTab('limitations')} 
                    className={`text-sm sm:text-base ${activeTab === 'limitations' ? 'text-orange-500' : 'text-gray-600'}`}
                  >
                    Limitations
                  </button>
                </li>
                <li className={`pb-2 ${activeTab === 'future updates' ? 'border-b-2 border-orange-500' : ''}`}>
                  <button 
                    onClick={() => setActiveTab('future updates')} 
                    className={`text-sm sm:text-base ${activeTab === 'future updates' ? 'text-orange-500' : 'text-gray-600'}`}
                  >
                    Future Updates
                  </button>
                </li>
                <li className={`pb-2 ${activeTab === 'tutorials' ? 'border-b-2 border-orange-500' : ''}`}>
                  <button 
                    onClick={() => setActiveTab('tutorials')} 
                    className={`text-sm sm:text-base ${activeTab === 'tutorials' ? 'text-orange-500' : 'text-gray-600'}`}
                  >
                    Tutorials
                  </button>
                </li>
              </ul>
            </nav>

            <div className="relative">
              <section id="description" className={`py-4 ${activeTab !== 'description' ? 'hidden' : ''}`}>
                <p className="mb-4 text-sm sm:text-base">
                  DexGenerator is a <strong>powerful tool designed to simplify the process of creating and deploying
                  smart contracts on various blockchain networks</strong>. It provides a user-friendly interface for
                  generating secure, audited smart contracts without requiring extensive coding knowledge.
                </p>
                <p className="mb-4 text-sm sm:text-base">
                  With DexGenerator, users can <strong>easily create custom tokens, NFTs, and other blockchain-based
                  assets</strong>. The platform offers a range of pre-built templates and customization options,
                  allowing users to tailor their smart contracts to specific needs. Additionally, DexGenerator
                  provides seamless integration with pre-built user interfaces, making it easy to create complete
                  decentralized applications (DApps) with minimal effort.
                </p>
                <a 
                  href="https://docs.dexkit.com/defi-products/dexgenerator/overview" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-orange-600 hover:underline text-sm sm:text-base"
                >
                  Overview
                </a>
              </section>

              <section id="requirements" className={`py-4 ${activeTab !== 'requirements' ? 'hidden' : ''}`}>
                <ul className="list-disc pl-5 space-y-2">
                  {requirements.map((req, index) => (
                    <li key={index} className="text-sm sm:text-base">{req}</li>
                  ))}
                </ul>
              </section>

              <section id="limitations" className={`py-4 ${activeTab !== 'limitations' ? 'hidden' : ''}`}>
                <ul className="list-disc pl-5 space-y-2">
                  {limitations.map((limit, index) => (
                    <li key={index} className="text-sm sm:text-base">{limit}</li>
                  ))}
                </ul>
              </section>

              <section id="future updates" className={`py-4 ${activeTab !== 'future updates' ? 'hidden' : ''}`}>
                <ul className="list-disc pl-5 space-y-2">
                  {futureUpdates.map((update, index) => (
                    <li key={index} className="text-sm sm:text-base">{update}</li>
                  ))}
                </ul>
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
                href="https://dexappbuilder.dexkit.com/contract-wizard" 
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