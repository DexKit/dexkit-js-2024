'use client';

import { useState, useRef, FormEvent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';
import SimpleCaptcha from './SimpleCaptcha';
import { CaptchaProvider, useCaptcha } from './CaptchaContext';

interface ServiceType {
  id: string;
  title: string;
  description: string;
  price: number;
  messageIds: {
    title: string;
    desc: string;
    price: string;
  };
  productUrl?: string;
  imageUrl?: string;
  additionalImages?: string[];
  products?: Array<{name: string, url: string}>;
  isPriority?: boolean;
}

interface BlockchainNetwork {
  id: string;
  name: string;
  supportedCoins: string[];
}

interface Stablecoin {
  id: string;
  name: string;
  contractAddresses: {
    [networkId: string]: string;
  };
}

export default function HireADevForm() {
  return (
    <CaptchaProvider>
      <HireADevFormContent />
    </CaptchaProvider>
  );
}

function HireADevFormContent() {
  const intl = useIntl();
  const { locale } = useParams();
  const { captchaToken } = useCaptcha();
  
  const [email, setEmail] = useState('');
  const [extraNotes, setExtraNotes] = useState('');
  const [paymentTxId, setPaymentTxId] = useState('');
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);
  
  const [activeImageIndex, setActiveImageIndex] = useState<{[key: string]: number}>({});
  
  const [selectedNetwork, setSelectedNetwork] = useState<string>('');
  const [selectedCoin, setSelectedCoin] = useState<string>('');
  
  const services: ServiceType[] = [
    {
      id: 'singleDApp',
      title: 'Single DApp',
      description: 'Swap DApp, Exchange DApp, Wallet DApp + logo (if needed) 5 AI-generated images',
      price: 200,
      messageIds: {
        title: 'hireADev.services.singleDApp.title',
        desc: 'hireADev.services.singleDApp.desc',
        price: 'hireADev.services.singleDApp.price'
      },
      productUrl: 'https://getbitcoin.dexkit.app/',
      imageUrl: '/imgs/services/getbitcoinapp.png',
      additionalImages: [
        '/imgs/services/getbitcoinapp2.png'
      ],
      products: [
        { name: 'DexSwap', url: '/dexswap' },
        { name: 'DexExchangePro', url: '/dexexchangepro' },
        { name: 'DexNFTMarket', url: '/dexnftmarket' },
        { name: 'DexNFTStore', url: '/dexnftstore' }
      ]
    },
    {
      id: 'intermediateDApp',
      title: 'Intermediate DApp',
      description: 'More complex DApp + logo (if needed) with testnet ERC20 token + testnet staking contract + 8 AI-generated images',
      price: 400,
      messageIds: {
        title: 'hireADev.services.intermediateDApp.title',
        desc: 'hireADev.services.intermediateDApp.desc',
        price: 'hireADev.services.intermediateDApp.price'
      },
      productUrl: 'https://themidastouch.dexkit.app/',
      imageUrl: '/imgs/services/themidastouchapp.png',
      additionalImages: [
        '/imgs/services/themidastouchapp2.png'
      ],
      products: [
        { name: 'DexSwap', url: '/dexswap' },
        { name: 'DexExchangePro', url: '/dexexchangepro' },
        { name: 'DexNFTMarket', url: '/dexnftmarket' },
        { name: 'DexNFTStore', url: '/dexnftstore' },
        { name: 'DexGenerator', url: '/dexgenerator' }
      ]
    },
    {
      id: 'advancedDApp',
      title: 'Advanced DApp',
      description: 'Complex DApp with all the options from the other ones, but with Gated Content and contract deployments',
      price: 800,
      messageIds: {
        title: 'hireADev.services.advancedDApp.title',
        desc: 'hireADev.services.advancedDApp.desc',
        price: 'hireADev.services.advancedDApp.price'
      },
      productUrl: 'https://cybercows.dexkit.app/',
      imageUrl: '/imgs/services/cybercowsapp.png',
      additionalImages: [
        '/imgs/services/cybercowsapp2.png',
        '/imgs/services/cybercowsapp3.png',
        '/imgs/services/cybercowsapp4.png'
      ],
      products: [
        { name: 'DexSwap', url: '/dexswap' },
        { name: 'DexExchangePro', url: '/dexexchangepro' },
        { name: 'DexNFTMarket', url: '/dexnftmarket' },
        { name: 'DexNFTStore', url: '/dexnftstore' },
        { name: 'DexGenerator', url: '/dexgenerator' },
        { name: 'Gated Content', url: 'https://docs.dexkit.com/defi-products/dexappbuilder/managing-this-tool/gated-content' },
        { name: 'Gamification', url: 'https://docs.dexkit.com/defi-products/dexappbuilder/leaderboards' }
      ]
    },
    {
      id: 'completeProject',
      title: 'Complete Project Development',
      description: 'Full project creation including social media, NextJS 15 landing page with latest technologies, Telegram bot with AI learning for knowledge base contextualization, Discord server setup (if needed), and all previous services.',
      price: 10000,
      messageIds: {
        title: 'hireADev.services.completeProject.title',
        desc: 'hireADev.services.completeProject.desc',
        price: 'hireADev.services.completeProject.price'
      },
      imageUrl: '/imgs/services/ghostx.png',
      additionalImages: [
        '/imgs/services/ghostx.png',
        '/imgs/services/ghostx.png'
      ],
      products: [
        { name: 'NextJS 15 Landing', url: '#' },
        { name: 'Telegram AI Bot', url: '#' },
        { name: 'Discord Server', url: '#' },
        { name: 'Social Media Setup', url: '#' },
        { name: 'DexSwap', url: '/dexswap' },
        { name: 'DexExchangePro', url: '/dexexchangepro' },
        { name: 'DexNFTMarket', url: '/dexnftmarket' },
        { name: 'DexNFTStore', url: '/dexnftstore' },
        { name: 'DexGenerator', url: '/dexgenerator' }
      ],
      isPriority: true
    },
    {
      id: 'blockchainConsulting',
      title: 'Blockchain Consulting',
      description: 'Expert guidance on blockchain strategy, smart contracts, DApps, tokenomics, and security. Flexible, hourly-rate advisory to help you innovate and integrate blockchain effectively.',
      price: 100,
      messageIds: {
        title: 'hireADev.services.blockchainConsulting.title',
        desc: 'hireADev.services.blockchainConsulting.desc',
        price: 'hireADev.services.blockchainConsulting.price'
      },
      imageUrl: '/imgs/services/blockchainconsulting.png'
    }
  ];
  
  const networks: BlockchainNetwork[] = [
    {
      id: 'ethereum',
      name: 'Ethereum',
      supportedCoins: ['usdt', 'usdc', 'dai']
    },
    {
      id: 'polygon',
      name: 'Polygon',
      supportedCoins: ['usdt', 'usdc', 'dai']
    },
    {
      id: 'bsc',
      name: 'Binance Smart Chain',
      supportedCoins: ['usdt', 'usdc', 'dai']
    },
    {
      id: 'optimism',
      name: 'Optimism',
      supportedCoins: ['usdt', 'usdc', 'dai']
    },
    {
      id: 'base',
      name: 'Base',
      supportedCoins: ['usdc', 'dai']
    },
    {
      id: 'arbitrum',
      name: 'Arbitrum',
      supportedCoins: ['usdt', 'usdc', 'dai']
    }
  ];
  
  const stablecoins: Stablecoin[] = [
    {
      id: 'usdt',
      name: 'USDT (Tether)',
      contractAddresses: {
        ethereum: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        polygon: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
        bsc: '0x55d398326f99059fF775485246999027B3197955',
        optimism: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
        arbitrum: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9'
      }
    },
    {
      id: 'usdc',
      name: 'USDC (USD Coin)',
      contractAddresses: {
        ethereum: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        polygon: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
        bsc: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
        optimism: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
        base: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
        arbitrum: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8'
      }
    },
    {
      id: 'dai',
      name: 'DAI',
      contractAddresses: {
        ethereum: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        polygon: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
        bsc: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
        optimism: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
        base: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb',
        arbitrum: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1'
      }
    }
  ];
  
  const resetForm = () => {
    setEmail('');
    setExtraNotes('');
    setPaymentTxId('');
    setSelectedService(null);
    setShowServiceForm(false);
    if (formRef.current) {
      formRef.current.reset();
    }
  };
  
  const selectService = (service: ServiceType) => {
    setSelectedService(service);
    setShowServiceForm(true);
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setMessage(intl.formatMessage({ id: 'hireADev.form.emailInvalid' }));
      setIsSuccess(false);
      toast.error(intl.formatMessage({ id: 'hireADev.form.emailInvalid' }), {
        position: 'bottom-right',
        style: { background: 'red', color: 'white' }
      });
      return;
    }

    if (!paymentTxId || paymentTxId.trim() === '') {
      toast.error(intl.formatMessage({ id: 'hireADev.form.paymentTxIdRequired', defaultMessage: 'Payment transaction ID is required' }), {
        position: 'bottom-right',
        style: { background: 'red', color: 'white' }
      });
      return;
    }
    
    if (!captchaToken) {
      setMessage(intl.formatMessage({ id: 'hireADev.form.turnstileError' }));
      setIsSuccess(false);
      toast.error(intl.formatMessage({ id: 'hireADev.form.turnstileError' }), {
        position: 'bottom-right',
        style: { background: 'red', color: 'white' }
      });
      return;
    }
    
    if (!selectedService) {
      setIsLoading(false);
      return;
    }
    
    if (!selectedNetwork || !selectedCoin) {
      toast.error(intl.formatMessage({ id: 'hireADev.form.paymentMethodRequired' }), {
        position: 'bottom-right',
        style: { background: 'red', color: 'white' }
      });
      return;
    }
    
    setIsLoading(true);
    setMessage('');
    
    try {
      console.log('Sending data to server, including paymentTxId:', paymentTxId);
      
      const response = await fetch('/api/hire-dev/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientEmail: email,
          product: selectedService.id,
          extraNotes,
          cost: selectedService.price,
          paymentType: 'single',
          locale: locale || 'en',
          turnstileToken: captchaToken,
          paymentTxId: paymentTxId.trim(),
          paymentNetwork: selectedNetwork,
          paymentCoin: selectedCoin
        }),
      });
      
      const result = await response.json();
      console.log('Server answer:', result);
      
      if (response.ok) {
        console.log('Processed correctly:', result.serviceId);
        setMessage(intl.formatMessage({ id: 'hireADev.form.success' }));
        setIsSuccess(true);
        toast.success(intl.formatMessage({ id: 'hireADev.form.success' }), {
          position: 'bottom-right',
          style: { background: 'green', color: 'white' }
        });
        resetForm();
      } else {
        console.error('Error from server:', result);
        setMessage(intl.formatMessage({ id: result.messageId || 'hireADev.form.error' }) + 
          (process.env.NODE_ENV === 'development' ? ` (${result.error})` : ''));
        setIsSuccess(false);
        toast.error(intl.formatMessage({ id: result.messageId || 'hireADev.form.error' }), {
          position: 'bottom-right',
          style: { background: 'red', color: 'white' }
        });
      }
    } catch (error) {
      console.error('Detailed error sending:', error);
      setMessage(intl.formatMessage({ id: 'hireADev.form.error' }));
      setIsSuccess(false);
      toast.error(intl.formatMessage({ id: 'hireADev.form.error' }), {
        position: 'bottom-right',
        style: { background: 'red', color: 'white' }
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(intl.formatMessage({ id: 'common.copied' }) || 'Copied to clipboard!', {
        position: 'bottom-right',
        style: { background: 'green', color: 'white' }
      });
    }).catch(err => {
      console.error('Error copying text: ', err);
    });
  };
  
  const paymentAddress = "0x5265Bde27F57E738bE6c1F6AB3544e82cdc92a8f";
  
  const changeImage = (serviceId: string, direction: 'prev' | 'next') => {
    const service = services.find(s => s.id === serviceId);
    
    if (service && service.additionalImages && service.additionalImages.length > 0) {
      const totalImages = 1 + service.additionalImages.length;
      const currentIndex = activeImageIndex[serviceId] !== undefined ? activeImageIndex[serviceId] : 0;
      let newIndex;
      
      if (direction === 'prev') {
        newIndex = (currentIndex - 1 + totalImages) % totalImages;
      } else {
        newIndex = (currentIndex + 1) % totalImages;
      }
      
      setActiveImageIndex(prev => ({
        ...prev,
        [serviceId]: newIndex
      }));
    }
  };
  
  return (
    <div className="bg-white min-h-screen">
      <Toaster />
      <main className="container mx-auto px-4 py-5">
        <h1 className="text-4xl font-bold text-center mb-1 text-gray-800">
          <FormattedMessage id="hireADev.title" />
        </h1>
        <p className="text-center mb-2 text-gray-600 max-w-3xl mx-auto">
          <FormattedMessage id="hireADev.intro" />
        </p>
        
        {!showServiceForm ? (
          <div className="fade-in">
            <h2 className="text-2xl font-bold mb-2 text-white">
              <FormattedMessage id="hireADev.services.title" />
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {services.map((service) => (
                <div 
                  key={service.id}
                  className={`service-card bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 relative ${
                    selectedService?.id === service.id ? 'ring-2 ring-orange-400' : ''
                  }`}
                >
                  {service.isPriority && (
                    <div className="absolute top-2 right-2 z-10">
                      <div className="priority-badge group relative">
                        <FormattedMessage id="hireADev.services.priority" defaultMessage="Priority" />
                        <div className="absolute right-0 mt-1 w-48 bg-white text-gray-800 text-xs p-2 rounded shadow-lg z-20 hidden group-hover:block">
                          <FormattedMessage 
                            id="hireADev.services.priorityDesc" 
                            defaultMessage="This service has priority response within 1 hour." 
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {service.imageUrl && (
                    <div className="relative w-full h-48 overflow-hidden rounded-t-lg bg-gray-100">
                      <div className="relative w-full h-full flex items-center justify-center">
                        <Image
                          src={
                            service.additionalImages && 
                            service.additionalImages.length > 0 && 
                            activeImageIndex[service.id] !== undefined && 
                            activeImageIndex[service.id] > 0
                              ? service.additionalImages[activeImageIndex[service.id] - 1]
                              : service.imageUrl
                          }
                          alt={intl.formatMessage({ id: service.messageIds.title })}
                          fill
                          className={`transition-transform duration-500 hover:scale-105 ${
                            service.id === 'blockchainConsulting' ? 'object-cover' : 'object-contain'
                          }`}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        
                        {service.additionalImages && service.additionalImages.length > 0 && (
                          <>
                            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 z-10">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  changeImage(service.id, 'prev');
                                }}
                                className="w-8 h-8 flex items-center justify-center bg-black bg-opacity-40 rounded-full text-white hover:bg-opacity-60 transition-all duration-300"
                                aria-label="Imagen anterior"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                              </button>
                              
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  changeImage(service.id, 'next');
                                }}
                                className="w-8 h-8 flex items-center justify-center bg-black bg-opacity-40 rounded-full text-white hover:bg-opacity-60 transition-all duration-300"
                                aria-label="Siguiente imagen"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </button>
                            </div>
                            
                            <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1 z-10">
                              {[service.imageUrl, ...service.additionalImages].map((_, index) => (
                                <button
                                  key={index}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveImageIndex(prev => ({
                                      ...prev,
                                      [service.id]: index
                                    }));
                                  }}
                                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    (activeImageIndex[service.id] === undefined && index === 0) || 
                                    activeImageIndex[service.id] === index 
                                      ? 'bg-white w-3' 
                                      : 'bg-white bg-opacity-50'
                                  }`}
                                  aria-label={`Ir a imagen ${index + 1}`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                        
                        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black to-transparent opacity-30"></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">
                      <FormattedMessage id={service.messageIds.title} />
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-3">
                      <FormattedMessage id={service.messageIds.desc} />
                    </p>
                    
                    <div className="flex-grow min-h-[80px]">
                      {service.products && service.products.length > 0 && (
                        <div className="mb-2">
                          <h4 className="text-xs font-semibold text-gray-700 mb-1.5">
                            <FormattedMessage id="hireADev.services.productsUsed" defaultMessage="Used products:" />
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {service.products.map((product, idx) => (
                              <Link
                                key={idx}
                                href={product.url}
                                target={product.url.startsWith('http') ? "_blank" : "_self"}
                                rel={product.url.startsWith('http') ? "noopener noreferrer" : ""}
                                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors"
                              >
                                {product.name}
                                {product.url.startsWith('http') && (
                                  <FaExternalLinkAlt className="ml-1 h-2.5 w-2.5" />
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-auto">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-lg font-bold text-black">
                          <FormattedMessage id={service.messageIds.price} />
                        </div>
                        
                        {service.productUrl && (
                          <Link
                            href={service.productUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-500 text-xs hover:underline"
                          >
                            <FormattedMessage id="hireADev.services.viewExample" defaultMessage="View example" />
                          </Link>
                        )}
                      </div>
                      
                      <button
                        onClick={() => selectService(service)}
                        className="w-full bg-orange-400 text-black py-1.5 rounded hover:bg-orange-500 transition duration-300 font-semibold text-sm"
                      >
                        <FormattedMessage id="hireADev.card.selectButton" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 border border-gray-200 shadow-lg">
            <button
              onClick={() => setShowServiceForm(false)}
              className="mb-6 text-gray-600 hover:text-gray-900 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <FormattedMessage id="common.back" defaultMessage="Back" />
            </button>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              <FormattedMessage id="hireADev.form.title" defaultMessage="Complete your request" />
            </h2>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-gray-700 mb-1">
                <FormattedMessage id="hireADev.form.serviceName" defaultMessage="Selected service" />:
              </h3>
              <p className="text-gray-900 mb-2">
                <FormattedMessage id={selectedService?.messageIds.title} defaultMessage={selectedService?.title} />
              </p>
              
              <h3 className="font-semibold text-gray-700 mb-1">
                <FormattedMessage id="hireADev.form.serviceCost" defaultMessage="Cost" />:
              </h3>
              <p className="text-orange-500 font-bold">
                <FormattedMessage id={selectedService?.messageIds.price} defaultMessage={`${selectedService?.price} USD`} />
              </p>
            </div>
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  <FormattedMessage id="hireADev.form.email" />*
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border text-black bg-gray-50 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="extraNotes" className="block text-sm font-medium text-gray-700 mb-1">
                  <FormattedMessage id="hireADev.form.notes" />
                </label>
                <textarea
                  id="extraNotes"
                  value={extraNotes}
                  onChange={(e) => setExtraNotes(e.target.value)}
                  rows={4}
                  className="w-full p-3 border text-black bg-gray-50 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>

              <div className="bg-orange-50 p-5 rounded-lg mb-6 border border-orange-200">
                <h3 className="font-semibold text-gray-800 mb-3 text-lg">
                  <FormattedMessage id="hireADev.form.paymentInstructions" />
                </h3>
                
                <p className="mb-4 text-sm text-gray-700">
                  <FormattedMessage 
                    id="hireADev.form.paymentDesc" 
                    values={{ amount: `${selectedService?.price} USD` }}
                  />
                </p>
                
                <p className="mb-4 text-sm text-orange-500 hover:underline">
                  <Link 
                    href="https://dexappbuilder.dexkit.com/token/buy/ethereum/usdt" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center hover:underline"
                  >
                    <FormattedMessage id="hireADev.form.getStablecoins" defaultMessage="Do you need stablecoins? Get them here" />
                    <FaExternalLinkAlt size={12} className="ml-1" />
                  </Link>
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="network" className="block text-sm font-medium text-gray-700 mb-1">
                      <FormattedMessage id="hireADev.form.selectNetwork" defaultMessage="Select Blockchain Network" />*
                    </label>
                    <select
                      id="network"
                      value={selectedNetwork}
                      onChange={(e) => {
                        setSelectedNetwork(e.target.value);
                        setSelectedCoin('');
                      }}
                      className="w-full p-3 border text-black bg-gray-50 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      required
                    >
                      <option value="" disabled>
                        {intl.formatMessage({ id: 'hireADev.form.selectNetworkOption', defaultMessage: '-- Select a network --' })}
                      </option>
                      {networks.map((network) => (
                        <option key={network.id} value={network.id}>
                          {network.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="stablecoin" className="block text-sm font-medium text-gray-700 mb-1">
                      <FormattedMessage id="hireADev.form.selectStablecoin" defaultMessage="Select Stablecoin" />*
                    </label>
                    <select
                      id="stablecoin"
                      value={selectedCoin}
                      onChange={(e) => setSelectedCoin(e.target.value)}
                      className="w-full p-3 border text-black bg-gray-50 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      disabled={!selectedNetwork}
                      required
                    >
                      <option value="" disabled>
                        {intl.formatMessage({ id: 'hireADev.form.selectCoinOption', defaultMessage: '-- Select a stablecoin --' })}
                      </option>
                      {selectedNetwork && 
                        networks.find(n => n.id === selectedNetwork)?.supportedCoins.map(coinId => {
                          const coin = stablecoins.find(c => c.id === coinId);
                          return coin && (
                            <option key={coin.id} value={coin.id}>
                              {coin.name}
                            </option>
                          );
                        })
                      }
                    </select>
                  </div>
                </div>
                
                {selectedNetwork && selectedCoin && (
                  <div className="mb-4">
                    <div className="mb-2">
                      <span className="block text-sm font-medium text-gray-700 mb-1">
                        <FormattedMessage id="hireADev.form.paymentAddress" defaultMessage="Payment Address" />:
                      </span>
                      <div className="relative">
                        <div className="flex items-center">
                          <input
                            type="text"
                            readOnly
                            value={paymentAddress}
                            className="w-full p-3 pr-10 text-sm border border-gray-300 bg-gray-50 rounded-lg text-gray-700"
                          />
                          <button
                            type="button"
                            onClick={() => copyToClipboard(paymentAddress)}
                            className="absolute right-2 text-purple-600 hover:text-purple-800"
                            aria-label={intl.formatMessage({ id: 'common.copy', defaultMessage: 'Copy' })}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <span className="block text-sm font-medium text-gray-700 mb-1">
                        <FormattedMessage id="hireADev.form.contractAddress" defaultMessage="Token Contract Address" />:
                      </span>
                      <div className="relative">
                        <div className="flex items-center">
                          <input
                            type="text"
                            readOnly
                            value={stablecoins.find(c => c.id === selectedCoin)?.contractAddresses[selectedNetwork] || ''}
                            className="w-full p-3 pr-10 text-sm border border-gray-300 bg-gray-50 rounded-lg text-gray-700"
                          />
                          <button
                            type="button"
                            onClick={() => copyToClipboard(stablecoins.find(c => c.id === selectedCoin)?.contractAddresses[selectedNetwork] || '')}
                            className="absolute right-2 text-purple-600 hover:text-purple-800"
                            aria-label={intl.formatMessage({ id: 'common.copy', defaultMessage: 'Copy' })}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 text-sm text-gray-600">
                      <p className="font-medium mb-1">
                        <FormattedMessage id="hireADev.form.paymentSteps" defaultMessage="How to pay:" />
                      </p>
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>
                          <FormattedMessage id="hireADev.form.paymentStep1" defaultMessage="Send exactly {amount} {coin} on the {network} network to the address above" 
                            values={{ 
                              amount: selectedService?.price, 
                              coin: stablecoins.find(c => c.id === selectedCoin)?.name || selectedCoin.toUpperCase(),
                              network: networks.find(n => n.id === selectedNetwork)?.name || selectedNetwork
                            }} 
                          />
                        </li>
                        <li>
                          <FormattedMessage id="hireADev.form.paymentStep2" defaultMessage="Copy the transaction ID (TxID) after sending" />
                        </li>
                        <li>
                          <FormattedMessage id="hireADev.form.paymentStep3" defaultMessage="Paste the transaction ID in the field below" />
                        </li>
                      </ol>
                    </div>
                  </div>
                )}
                
                <p className="text-xs text-gray-600 italic">
                  <FormattedMessage 
                    id="hireADev.form.paymentSupport" 
                    defaultMessage="After payment, enter the transaction ID below. For support, contact support@dexkit.com"
                  />
                </p>
              </div>
              
              <div>
                <label htmlFor="paymentTxId" className="block text-sm font-medium text-gray-700 mb-1">
                  <FormattedMessage id="hireADev.form.paymentTxId" defaultMessage="Payment Transaction ID" />*
                </label>
                <input
                  type="text"
                  id="paymentTxId"
                  value={paymentTxId}
                  onChange={(e) => setPaymentTxId(e.target.value)}
                  className="w-full p-3 border text-black bg-gray-50 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="mb-4">
                <SimpleCaptcha />
              </div>
              
              <p className="text-sm text-gray-600 italic">
                <FormattedMessage id="hireADev.form.paymentNote" />
              </p>
              
              {message && (
                <div className={`p-4 rounded-lg ${isSuccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {message}
                </div>
              )}
              
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-6 py-3 bg-orange-400 text-black rounded-lg hover:bg-orange-500 transition duration-300 flex items-center justify-center font-semibold ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : null}
                  <FormattedMessage id="hireADev.form.submit" />
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}