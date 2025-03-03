'use client';

import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import Image from 'next/image';
import { FaCopy } from 'react-icons/fa';

export default function ContractAddressesContent() {
  const intl = useIntl();
  const [isMobile, setIsMobile] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState('');

  useEffect(() => {
    const pageTitle = intl.formatMessage({ id: 'contractAddresses.title' });
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

  const contracts = [
    { network: 'Ethereum', address: '0x7866e48c74cbfb8183cd1a929cd9b95a7a5cb4f4', icon: '/imgs/networks/ethereum.png', explorer: 'https://etherscan.io/token/0x7866e48c74cbfb8183cd1a929cd9b95a7a5cb4f4' },
    { network: 'Polygon', address: '0x4d0def42cf57d6f27cd4983042a55dce1c9f853c', icon: '/imgs/networks/polygon.png', explorer: 'https://polygonscan.com/token/0x4d0def42cf57d6f27cd4983042a55dce1c9f853c' },
    { network: 'Binance Chain', address: '0x314593fa9a2fa16432913dbccc96104541d32d11', icon: '/imgs/networks/binance.png', explorer: 'https://bscscan.com/token/0x314593fa9a2fa16432913dbccc96104541d32d11' },
    { network: 'Base', address: '0x946f8b0ef009f3f5b1b35e6511a82a58b09d8d4e', icon: '/imgs/networks/basenew.png', explorer: 'https://basescan.org/token/0x946f8b0ef009f3f5b1b35e6511a82a58b09d8d4e' },
    { network: 'Arbitrum', address: '0x9134283aFaF6E1B45689EC0b0c82fF2B232BCb30', icon: '/imgs/networks/arbitrum.png', explorer: 'https://arbiscan.io/token/0x9134283aFaF6E1B45689EC0b0c82fF2B232BCb30' },
  ];

  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address).then(() => {
      setCopiedAddress(address);
      setTimeout(() => setCopiedAddress(''), 2000);
    });
  };

  return (
    <div className="min-h-screen">
      <div className="text-white py-8 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <h1 className={`text-4xl md:text-6xl font-bold mb-4 md:mb-0 ${isMobile ? 'w-full' : 'md:w-1/2'} text-center md:text-left`}>
              {intl.formatMessage({ id: "contractAddresses.title" })}
            </h1>
            <p className={`text-lg ${isMobile ? '' : 'sm:text-xl'} ${isMobile ? 'w-full' : 'md:w-1/2'} text-center ${isMobile ? '' : 'md:text-left'}`}>
              {intl.formatMessage({ id: "contractAddresses.subtitle" })}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white text-black">
        <main className="container mx-auto px-4 py-8 md:py-12">
          <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-8" role="alert">
            <p className="font-bold">{intl.formatMessage({ id: "contractAddresses.warning.title" })}</p>
            <p>{intl.formatMessage({ id: "contractAddresses.warning.message" })}</p>
          </div>

          {contracts.map((contract, index) => (
            <section key={index} className="mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center">
                <Image src={contract.icon} alt={`${contract.network} logo`} width={32} height={32} className="mr-2" />
                {contract.network}
              </h2>
              <div className="bg-gray-100 rounded-lg shadow-lg p-6 md:p-8">
                <div className="flex flex-col items-start">
                  <code className="text-sm md:text-base break-all mb-4">{contract.address}</code>
                  <div className="flex flex-col items-start w-full">
                    <button
                      onClick={() => copyToClipboard(contract.address)}
                      className="inline-flex items-center bg-orange-400 text-black px-4 py-2 rounded hover:bg-orange-500 transition-colors duration-300 mb-2"
                    >
                      <FaCopy className="mr-2" />
                      {copiedAddress === contract.address
                        ? intl.formatMessage({ id: "common.copied" })
                        : intl.formatMessage({ id: "common.copy" })}
                    </button>
                    <a
                      href={contract.explorer}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 hover:underline inline-block"
                    >
                      {intl.formatMessage({ id: "contractAddresses.viewOnExplorer" })}
                    </a>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}
