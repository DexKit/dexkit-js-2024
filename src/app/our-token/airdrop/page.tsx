'use client';

import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import Image from 'next/image';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { getKitBalances, getTotalUsdValue, TokenBalance } from '@/services/kitBalanceService';

export default function AirdropContent() {
  const intl = useIntl();
  const [isMobile, setIsMobile] = useState(false);
  const [balances, setBalances] = useState<TokenBalance[]>([]);
  const [totalUsdValue, setTotalUsdValue] = useState('0');
  const [isLoading, setIsLoading] = useState(true);
  
  const treasuryAddress = '0x65073B9BBb15Fec458eDa8c1646Fe443F606cB7b';

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

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        setIsLoading(true);
        const kitBalances = await getKitBalances(treasuryAddress);
        setBalances(kitBalances);
        setTotalUsdValue(getTotalUsdValue(kitBalances));
      } catch (error) {
        console.error('Error getting balances:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalances();
  }, []);

  const getExplorerUrl = (networkId: number, address: string) => {
    switch (networkId) {
      case 1:
        return `https://etherscan.io/token/${address}?a=${treasuryAddress}`;
      case 56:
        return `https://bscscan.com/token/${address}?a=${treasuryAddress}`;
      case 137:
        return `https://polygonscan.com/token/${address}?a=${treasuryAddress}`;
      case 8453:
        return `https://basescan.org/token/${address}?a=${treasuryAddress}`;
      case 42161:
        return `https://arbiscan.io/token/${address}?a=${treasuryAddress}`;
      default:
        return '#';
    }
  };

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
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {intl.formatMessage({ id: "airdrop.treasuryBalance" })}
            </h2>
            
            <div className="bg-gray-100 rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">
                  {intl.formatMessage({ id: "airdrop.treasuryAddress" })}
                </h3>
                <a 
                  href={`https://etherscan.io/address/${treasuryAddress}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-orange-500 hover:text-orange-700 inline-flex items-center"
                >
                  <span className="mr-1">{treasuryAddress.substring(0, 6)}...{treasuryAddress.substring(treasuryAddress.length - 4)}</span>
                  <FaExternalLinkAlt size={14} />
                </a>
              </div>
              
              <div className="bg-white p-4 rounded-md shadow-md mb-4">
                <p className="text-lg font-semibold">
                  {intl.formatMessage({ id: "airdrop.totalUsdValue" })}: 
                  <span className="text-orange-500 ml-2">${totalUsdValue} USD</span>
                </p>
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center p-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {balances.map((balance, index) => (
                    <div key={index} className="bg-white p-4 rounded-md shadow-md">
                      <div className="flex items-center mb-2">
                        <Image 
                          src={balance.icon} 
                          alt={balance.network} 
                          width={24} 
                          height={24} 
                          className="mr-2"
                        />
                        <h4 className="font-semibold">{balance.network}</h4>
                      </div>
                      <p className="mb-1">
                        <span className="text-gray-600">{intl.formatMessage({ id: "airdrop.balance" })}: </span>
                        <span className="font-medium">{parseFloat(balance.formattedBalance).toLocaleString()} KIT</span>
                      </p>
                      <p className="mb-2">
                        <span className="text-gray-600">{intl.formatMessage({ id: "airdrop.value" })}: </span>
                        <span className="font-medium text-green-600">${balance.usdValue} USD</span>
                      </p>
                      <a 
                        href={getExplorerUrl(balance.networkId, balance.contractAddress)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-orange-500 hover:text-orange-700 inline-flex items-center"
                      >
                        <span className="mr-1">{intl.formatMessage({ id: "airdrop.viewOnExplorer" })}</span>
                        <FaExternalLinkAlt size={12} />
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
          
        </main>
      </div>
    </div>
  );
} 