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
        const balance = await getPolygonBalance(treasuryAddress);
        setPolygonBalance(balance);
      } catch (error) {
        console.error('Error fetching Polygon balance:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPolygonBalance();
  }, []);

  const getExplorerUrl = (networkId: number, contractAddress: string): string => {
    return `https://polygonscan.com/token/${contractAddress}?a=${treasuryAddress}`;
  };

  return (
    <div>
      <div className="bg-white text-black">
        <main className="container mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col lg:flex-row lg:gap-6">
            <section className="w-full lg:w-1/2 mb-12 lg:mb-0">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl md:text-3xl font-bold">
                  {intl.formatMessage({ id: "airdrop.polygonTreasuryBalance" })}
                </h2>
                <BuyKitButton />
              </div>
              
              <p className="mb-4 text-gray-700">
                {intl.formatMessage({ id: "airdrop.treasuryAddress" })}: <span className="font-mono text-sm bg-gray-100 p-1 rounded">{treasuryAddress}</span>
              </p>
              
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                {isLoading ? (
                  <div className="p-6 flex justify-center items-center">
                    <div className="w-12 h-12 border-4 border-t-4 border-t-orange-500 border-gray-200 rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold">
                        {intl.formatMessage({ id: "airdrop.totalUsdValue" })}
                      </h3>
                      <p className="text-lg text-green-600 font-bold">
                        ${polygonBalance?.usdValue || '0.00'} USD
                      </p>
                    </div>
                    
                    {polygonBalance && (
                      <div className="border border-gray-100 rounded-lg p-4 mb-2">
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
                        <p className="mb-1">
                          <span className="text-gray-600">{intl.formatMessage({ id: "airdrop.balance" })}: </span>
                          <span className="font-medium">{parseFloat(polygonBalance.formattedBalance).toLocaleString()} KIT</span>
                        </p>
                        <p className="mb-2">
                          <span className="text-gray-600">{intl.formatMessage({ id: "airdrop.value" })}: </span>
                          <span className="font-medium text-green-600">${polygonBalance.usdValue} USD</span>
                        </p>
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
                    
                    <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mt-4">
                      <p className="text-orange-700">
                        {intl.formatMessage({ id: "airdrop.polygonNotice" })}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>
            
            <section className="w-full lg:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {intl.formatMessage({ id: "airdrop.rewards.title" })}
              </h2>
              <div>
                <RewardsCalculator 
                  className="w-full" 
                  initialAmount={polygonBalance ? 
                    Math.min(parseFloat(polygonBalance.formattedBalance), 300000) : 
                    20000
                  } 
                />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
} 