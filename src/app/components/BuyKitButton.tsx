'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useIntl } from 'react-intl';
import Image from 'next/image';
import { FaChevronDown, FaExternalLinkAlt } from 'react-icons/fa';

interface BuyOption {
  network: string;
  icon: string;
  url: string;
}

const BuyKitButton: React.FC = () => {
  const intl = useIntl();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  const buyOptions: BuyOption[] = [
    {
      network: 'Ethereum',
      icon: '/imgs/networks/ethereum.png',
      url: 'https://dexappbuilder.dexkit.com/token/buy/ethereum/kit'
    },
    {
      network: 'Polygon',
      icon: '/imgs/networks/polygon.png',
      url: 'https://dexappbuilder.dexkit.com/token/buy/polygon/kit'
    },
    {
      network: 'Binance Chain',
      icon: '/imgs/networks/binance.png',
      url: 'https://dexappbuilder.dexkit.com/token/buy/bsc/kit'
    }
  ];
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-6 py-3 bg-orange-400 text-black rounded-lg hover:bg-orange-500 transition duration-300 flex items-center justify-center font-semibold"
      >
        <span>{intl.formatMessage({ id: 'buyKit.button' })}</span>
        <FaChevronDown className="ml-2" size={12} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-64 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          <div className="py-2">
            <div className="px-4 py-2 text-sm text-gray-700 font-medium border-b">
              {intl.formatMessage({ id: 'buyKit.selectNetwork' })}
            </div>
            
            {buyOptions.map((option, index) => (
              <a
                key={index}
                href={option.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-3 hover:bg-gray-100 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Image 
                  src={option.icon} 
                  alt={option.network} 
                  width={20} 
                  height={20} 
                  className="mr-3" 
                />
                <span className="flex-grow text-gray-700">{option.network}</span>
                <FaExternalLinkAlt size={12} className="text-gray-400" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyKitButton; 