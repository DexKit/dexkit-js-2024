'use client';

import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { getKitPrice } from '@/services/kitBalanceService';

interface RewardsCalculatorProps {
  className?: string;
  initialAmount?: number;
}

const RewardsCalculator: React.FC<RewardsCalculatorProps> = ({ className, initialAmount = 20000 }) => {
  const intl = useIntl();
  const [kitAmount, setKitAmount] = useState<number>(initialAmount);
  const [kitPrice, setKitPrice] = useState<number>(0.05);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const MAX_DISPLAY_AMOUNT = 300000;
  
  useEffect(() => {
    setKitAmount(Math.min(initialAmount, MAX_DISPLAY_AMOUNT));
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
  
  const calculateMonthlyReward = (amount: number): number => {
    return Math.min((amount / 10000) * 500, 500);
  };
  
  const monthlyReward = calculateMonthlyReward(kitAmount);
  const annualReward = monthlyReward * 12;
  const annualRewardPercentage = (annualReward / kitAmount) * 100 || 0;
  const monthlyRewardUsd = monthlyReward * kitPrice;
  
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
            className="w-full h-2 rounded-lg cursor-pointer appearance-none"
            style={{
              background: 'linear-gradient(to right, #fb923c, #9333ea)',
              height: '4px',
              WebkitAppearance: 'none',
              appearance: 'none'
            }}
          />
          <div 
            className="absolute top-[-6px] h-4 w-4 rounded-full bg-white border-2 border-orange-500 cursor-pointer"
            style={{
              left: `${(kitAmount / MAX_DISPLAY_AMOUNT) * 100}%`,
              transform: 'translateX(-50%)',
              boxShadow: '0 0 10px rgba(251, 146, 60, 0.5)'
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
            $ {isLoading ? '...' : monthlyRewardUsd.toFixed(2)}
          </p>
        </div>
        
        <div>
          <h3 className="text-gray-500 text-sm">
            {intl.formatMessage({ id: 'airdrop.calculator.annualReward' })}
          </h3>
          <p className="text-orange-500 text-xl font-bold">
            {isLoading ? '...' : `${annualRewardPercentage.toFixed(2)}%`}
          </p>
        </div>
      </div>
      
      <div className="bg-gray-100 p-4 rounded mt-4 border-l-4 border-orange-500">
        <p className="text-gray-700 text-sm">
          {intl.formatMessage({ id: 'airdrop.calculator.description' })}
        </p>
      </div>
    </div>
  );
};

export default RewardsCalculator;