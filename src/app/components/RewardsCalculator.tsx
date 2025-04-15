'use client';

import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { getKitPrice, getPolygonBalance } from '@/services/kitBalanceService';

interface RewardsCalculatorProps {
  className?: string;
  initialAmount?: number;
}

const HOLDERS_DATA_URL = 'https://raw.githubusercontent.com/DexKit/scripts-for-airdrop/refs/heads/main/mapped_holders.json';
const TREASURY_ADDRESS = '0x65073B9BBb15Fec458eDa8c1646Fe443F606cB7b';

interface Holder {
  owner_address: string;
  balance: string;
  balance_formatted: string;
  airdrop: string;
  airdrop_formatted: string;
}

const RewardsCalculator: React.FC<RewardsCalculatorProps> = ({ className, initialAmount = 20000 }) => {
  const intl = useIntl();
  const [kitAmount, setKitAmount] = useState<number>(initialAmount);
  const [kitPrice, setKitPrice] = useState<number>(0.05);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalHolders, setTotalHolders] = useState<number>(0);
  const [isLoadingHolders, setIsLoadingHolders] = useState<boolean>(true);
  const [totalCirculatingKIT, setTotalCirculatingKIT] = useState<number>(0);
  const [rewardsRatio, setRewardsRatio] = useState<number>(0);
  const [treasuryBalance, setTreasuryBalance] = useState<number>(0);
  const [isLoadingTreasury, setIsLoadingTreasury] = useState<boolean>(true);
  
  const MAX_DISPLAY_AMOUNT = 12000;
  
  useEffect(() => {
    const safeInitialAmount = Math.min(initialAmount || 1000, MAX_DISPLAY_AMOUNT);
    setKitAmount(safeInitialAmount);
  }, [initialAmount]);
  
  useEffect(() => {
    const fetchKitPrice = async () => {
      try {
        setIsLoading(true);
        const price = await getKitPrice();
        setKitPrice(price);
      } catch (error) {
        console.error('Error fetching Kit Price:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchKitPrice();
  }, []);
  
  useEffect(() => {
    const fetchTreasuryBalance = async () => {
      try {
        setIsLoadingTreasury(true);
        const balance = await getPolygonBalance(TREASURY_ADDRESS);
        
        if (balance) {
          const balanceNumber = parseFloat(balance.formattedBalance);
          setTreasuryBalance(balanceNumber);
        }
      } catch (error) {
        console.error('Error fetching Treasury balance:', error);
      } finally {
        setIsLoadingTreasury(false);
      }
    };
    
    fetchTreasuryBalance();
  }, []);
  
  useEffect(() => {
    const fetchHoldersData = async () => {
      try {
        setIsLoadingHolders(true);
        const response = await fetch(HOLDERS_DATA_URL);
        if (!response.ok) {
          throw new Error('Cannot load holders data');
        }
        const holders: Holder[] = await response.json();
        const validHolders = holders.filter(holder => 
          parseFloat(holder.balance_formatted) > 5
        );
        
        setTotalHolders(validHolders.length);
        
        const totalKitCirculating = validHolders.reduce((sum, holder) => 
          sum + parseFloat(holder.balance_formatted), 0);

        console.log(totalCirculatingKIT)
        setTotalCirculatingKIT(totalKitCirculating);
        
        if (treasuryBalance > 0 && totalKitCirculating > 0) {
          const ratio = treasuryBalance / totalKitCirculating;
          console.log('Cálculo de ratio:', {
            treasuryBalance,
            totalKitCirculating,
            ratio
          });
          setRewardsRatio(ratio);
        }
        
      } catch (error) {
        console.error('Error loading holders data:', error);
      } finally {
        setIsLoadingHolders(false);
      }
    };
    
    fetchHoldersData();
  }, [treasuryBalance]);
  
  /* const calculateMonthlyReward = (amount: number): number => {
    const cappedAmount = Math.min(amount, 10000);
    
    if (isLoadingHolders || isLoadingTreasury || rewardsRatio === 0 || treasuryBalance === 0) {
      const fallbackReward = (cappedAmount / 10000) * 500;
      return Math.min(fallbackReward, 500);
    }
    
    const monthlyTreasuryDistribution = (treasuryBalance * 0.05) / 12;
    
    const userRatio = cappedAmount / totalCirculatingKIT;
    const userReward = monthlyTreasuryDistribution * userRatio;
    
    const maxReward = (treasuryBalance * 0.05) / 12 / 10;
    return Math.min(userReward, maxReward);
  }; */

  const calculateMonthlyRewardUSD = (amount: number): number => {

    return amount * rewardsRatio * kitPrice;

  }  
  const monthlyRewardUSD = calculateMonthlyRewardUSD(kitAmount);
  const annualRewardUSD = monthlyRewardUSD * 12;
  const annualRewardPercentage = kitAmount > 0 ? (annualRewardUSD / (kitAmount*kitPrice)) * 100 : 0;
  
  
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKitAmount(parseInt(event.target.value));
  };
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value) || 0;
    setKitAmount(Math.min(value, MAX_DISPLAY_AMOUNT));
  };
  
  return (
    <div className={`bg-white rounded-lg p-6 border border-gray-200 shadow-md ${className}`}>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {intl.formatMessage({ id: 'airdrop.calculator.title' })}
      </h2>
      
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-700">{intl.formatMessage({ id: 'airdrop.calculator.youStake' })}</span>
          <div className="flex items-center">
            <input
              type="number"
              value={kitAmount}
              onChange={handleInputChange}
              className="w-24 bg-transparent text-gray-800 font-bold text-right border-b border-gray-300 focus:outline-none focus:border-orange-500"
              min="0"
              max={MAX_DISPLAY_AMOUNT}
            />
            <span className="ml-2 text-gray-800 font-bold">KIT</span>
          </div>
        </div>
        
        <div className="relative mt-4">
          <input
            type="range"
            min="0"
            max={MAX_DISPLAY_AMOUNT}
            value={kitAmount}
            onChange={handleSliderChange}
            className="w-full h-2 rounded-lg cursor-pointer appearance-none range-input-no-thumb"
            style={{
              background: 'linear-gradient(to right, #fb923c, #9333ea)',
              height: '4px',
              WebkitAppearance: 'none',
              appearance: 'none',
              outline: 'none',
              border: 'none'
            }}
          />
          <div 
            className="absolute top-[-6px] h-4 w-4 rounded-full bg-white border-2 border-orange-500 cursor-pointer"
            style={{
              left: `${(kitAmount / MAX_DISPLAY_AMOUNT) * 100}%`,
              transform: 'translateX(-50%)',
              boxShadow: '0 0 10px rgba(251, 146, 60, 0.5)',
              pointerEvents: 'none'
            }}
          />
        </div>
        
        <div className="flex justify-between text-gray-500 text-sm mt-1">
          <span>0</span>
          <span>{MAX_DISPLAY_AMOUNT.toLocaleString()}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <h3 className="text-gray-500 text-sm">
            {intl.formatMessage({ id: 'airdrop.calculator.kitPrice' })}
          </h3>
          <p className="text-gray-800 text-lg font-bold">
            {isLoading ? (
              <span className="animate-pulse">...</span>
            ) : (
              `$ ${kitPrice.toFixed(3)}`
            )}
          </p>
        </div>
        
        <div>
          <h3 className="text-gray-500 text-sm">
            {intl.formatMessage({ id: 'airdrop.calculator.monthlyReward' })}
          </h3>
          <p className="text-orange-500 text-lg font-bold">
            $ {isLoading || isLoadingHolders || isLoadingTreasury ? '...' : monthlyRewardUSD.toFixed(2)}
          </p>
        </div>
        
        <div>
          <h3 className="text-gray-500 text-sm">
            {intl.formatMessage({ id: 'airdrop.calculator.annualReward' })}
          </h3>
          <p className="text-orange-500 text-xl font-bold">
            {isLoading || isLoadingHolders || isLoadingTreasury ? '...' : `${annualRewardPercentage.toFixed(2)}%`}
          </p>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded mt-4 mb-4 border-l-4 border-blue-500">
        <div className="flex justify-between items-center">
          <h3 className="text-blue-700 font-medium">
            {intl.formatMessage({ id: 'airdrop.totalHolders' })}:
          </h3>
          <p className="text-blue-700 font-bold">
            {isLoadingHolders ? (
              <span className="animate-pulse">...</span>
            ) : (
              totalHolders.toLocaleString()
            )}
          </p>
        </div>
      </div>
      
      <div className="bg-green-50 p-3 sm:p-4 rounded mt-4 mb-4 border-l-4 border-green-500 overflow-hidden">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap justify-between items-center">
            <h3 className="text-green-700 font-medium text-sm sm:text-base">
              {intl.formatMessage({ id: 'airdrop.treasuryBalance' })}:
            </h3>
            <p className="text-green-700 font-bold text-sm sm:text-base break-all">
              {isLoadingTreasury ? (
                <span className="animate-pulse">...</span>
              ) : (
                `${treasuryBalance.toLocaleString()} KIT`
              )}
            </p>
          </div>
          <div className="flex flex-wrap justify-between items-center">
            <h3 className="text-green-700 font-medium text-sm sm:text-base">
              {intl.formatMessage({ id: 'airdrop.totalCirculatingKit' }) || 'KIT in holders hands'}:
            </h3>
            <p className="text-green-700 font-bold text-sm sm:text-base break-all">
              {isLoadingHolders ? (
                <span className="animate-pulse">...</span>
              ) : (
                totalCirculatingKIT.toLocaleString()
              )}
            </p>
          </div>
          <div className="flex flex-wrap justify-between items-center">
            <h3 className="text-green-700 font-medium text-sm sm:text-base">
              {intl.formatMessage({ id: 'airdrop.rewardsRatio' }) || 'Rewards Ratio'}:
            </h3>
            <p className="text-green-700 font-bold text-sm sm:text-base break-all">
              {isLoadingHolders || isLoadingTreasury ? (
                <span className="animate-pulse">...</span>
              ) : (
                `${rewardsRatio.toFixed(6)}`
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsCalculator;