'use client';

import { useState, useRef, FormEvent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Turnstile } from '@marsidev/react-turnstile';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';

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
}

export default function HireADevForm() {
  const intl = useIntl();
  const { locale } = useParams();
  
  const [email, setEmail] = useState('');
  const [extraNotes, setExtraNotes] = useState('');
  const [paymentTxId, setPaymentTxId] = useState('');
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);
  
  const [activeImageIndex, setActiveImageIndex] = useState<{[key: string]: number}>({});
  
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
  
  const resetForm = () => {
    setEmail('');
    setExtraNotes('');
    setPaymentTxId('');
    setSelectedService(null);
    setShowServiceForm(false);
    if (formRef.current) {
      formRef.current.reset();
    }
    resetTurnstile();
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
    
    if (!turnstileToken) {
      setMessage(intl.formatMessage({ id: 'hireADev.form.turnstileError' }));
      setIsSuccess(false);
      toast.error(intl.formatMessage({ id: 'hireADev.form.turnstileError' }), {
        position: 'bottom-right',
        style: { background: 'red', color: 'white' }
      });
      return;
    }
    
    setIsLoading(true);
    setMessage('');
    
    if (!selectedService) {
      setIsLoading(false);
      return;
    }
    
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
          turnstileToken,
          paymentTxId: paymentTxId.trim(),
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
  
  const resetTurnstile = () => {
    const turnstileContainer = document.querySelector("[data-turnstile-widget-id]");
    if (turnstileContainer) {
      const widgetId = turnstileContainer.getAttribute("data-turnstile-widget-id");
      if (widgetId && window.turnstile) {
        window.turnstile.reset(widgetId);
      }
    }
    setTurnstileToken(null);
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
                  className="service-card bg-white rounded-lg overflow-hidden shadow-xl flex flex-col h-full"
                >
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
                        <div className="text-lg font-bold text-orange-600">
                          <FormattedMessage id={service.messageIds.price} />
                        </div>
                        
                        {service.productUrl && (
                          <Link
                            href={service.productUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:text-purple-800 text-xs hover:underline"
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
              <p className="text-purple-600 font-bold">
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

              <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">
                  <FormattedMessage 
                    id="hireADev.form.paymentInstructions" 
                    defaultMessage="Payment Instructions" 
                  />:
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  <FormattedMessage 
                    id="hireADev.form.paymentDesc" 
                    defaultMessage="Please send {amount} to the following address on your preferred blockchain network:"
                    values={{ amount: `${selectedService?.price} USD` }}
                  />
                </p>
                
                <div className="flex items-center bg-white p-3 rounded border border-gray-300 mb-3">
                  <div className="flex-1 font-mono text-sm text-gray-800 truncate">
                    {paymentAddress}
                  </div>
                  <button 
                    type="button"
                    onClick={() => copyToClipboard(paymentAddress)}
                    className="ml-2 p-2 text-purple-600 hover:text-purple-800 rounded-md hover:bg-purple-50"
                    aria-label="Copy address"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
                
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
              
              <div className="py-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FormattedMessage id="hireADev.form.verification" defaultMessage="Verification" />*
                </label>
                <div className="flex justify-center items-center overflow-hidden bg-gray-50 p-2 rounded-lg border border-gray-200">
                  <Turnstile
                    siteKey="1x00000000000000000000AA"
                    onSuccess={setTurnstileToken}
                    onError={() => setTurnstileToken(null)}
                    onExpire={() => setTurnstileToken(null)}
                  />
                </div>
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