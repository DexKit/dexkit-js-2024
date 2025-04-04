'use client';

import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import Image from 'next/image';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { getPolygonBalance, TokenBalance } from '@/services/kitBalanceService';
import RewardsCalculator from '@/app/components/RewardsCalculator';
import BuyKitButton from '@/app/components/BuyKitButton';

export default function AirdropContent() {
  const intl = useIntl();
  const [polygonBalance, setPolygonBalance] = useState<TokenBalance | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const treasuryAddress = '0x65073B9BBb15Fec458eDa8c1646Fe443F606cB7b';

  useEffect(() => {
    const pageTitle = intl.formatMessage({ id: 'airdrop.title' });
    document.title = `${pageTitle} | DexKit`;
  }, [intl]);

  useEffect(() => {
    const fetchPolygonBalance = async () => {
      try {
        setIsLoading(true);
        if (treasuryAddress) {
          const balance = await getPolygonBalance(treasuryAddress);
          
          if (balance) {
            setPolygonBalance(balance);
          }
        }
      } catch (error) {
        console.error('Error fetching Polygon balance:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPolygonBalance();
  }, [treasuryAddress]);

  const getExplorerUrl = (networkId: number, contractAddress: string): string => {
    return `https://polygonscan.com/token/${contractAddress}?a=${treasuryAddress}`;
  };

  return (
    <div>
      <div className="bg-white text-black">
        <main className="container mx-auto px-4 py-6 md:py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row lg:gap-6">
            <section className="w-full lg:w-1/2 mb-8 lg:mb-0">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
                  {intl.formatMessage({ id: "airdrop.polygonTreasuryBalance" })}
                </h2>
                <div className="self-start sm:self-center">
                  <BuyKitButton />
                </div>
              </div>
              
              <p className="mb-4 text-gray-700">
                {intl.formatMessage({ id: "airdrop.polygonNotice" })}
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 sm:p-6 shadow-sm">
                {isLoading ? (
                  <div className="p-4 flex justify-center">
                    <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
                        <h3 className="text-gray-700 font-medium">
                          {intl.formatMessage({ id: "airdrop.treasuryAddress" })}:
                        </h3>
                        <code className="bg-gray-100 px-2 py-1 rounded text-xs sm:text-sm font-mono break-all">
                          {treasuryAddress}
                        </code>
                      </div>
                    </div>
                    
                    {polygonBalance && (
                      <div className="border border-gray-100 rounded-lg p-3 sm:p-4 mb-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Image
                            src={polygonBalance.icon}
                            alt={polygonBalance.network}
                            width={24}
                            height={24}
                            className="rounded-full"
                          />
                          <h4 className="font-semibold">{polygonBalance.network}</h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <p className="mb-1">
                            <span className="text-gray-600">{intl.formatMessage({ id: "airdrop.balance" })}: </span>
                            <span className="font-medium">{polygonBalance.formattedBalance} KIT</span>
                          </p>
                          <p className="mb-2">
                            <span className="text-gray-600">{intl.formatMessage({ id: "airdrop.value" })}: </span>
                            <span className="font-medium text-green-600">${polygonBalance.usdValue} USD</span>
                          </p>
                        </div>
                        <a 
                          href={getExplorerUrl(polygonBalance.networkId, polygonBalance.contractAddress)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-orange-500 hover:text-orange-700 inline-flex items-center"
                        >
                          <span className="mr-1">{intl.formatMessage({ id: "airdrop.viewOnExplorer" })}</span>
                          <FaExternalLinkAlt size={12} />
                        </a>
                      </div>
                    )}
                    
                    <div className="bg-orange-50 border-l-4 border-orange-500 p-3 sm:p-4 mt-4">
                      <p className="text-orange-700 text-sm">
                        {intl.formatMessage({ id: "airdrop.polygonNotice" })}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>
            
            <section className="w-full lg:w-1/2">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
                {intl.formatMessage({ id: "airdrop.rewards.title" })}
              </h2>
              <div>
                <RewardsCalculator 
                  className="w-full" 
                  initialAmount={1000}
                />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
} 