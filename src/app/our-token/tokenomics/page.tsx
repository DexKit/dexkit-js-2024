'use client';

import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import PieChart from './PieChart';
import Image from 'next/image';
import { ChartData, ChartOptions } from 'chart.js';

export default function TokenomicsContent() {
  const intl = useIntl();
  const [chartSize, setChartSize] = useState(400);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setChartSize(width < 768 ? 250 : width < 1024 ? 300 : 400);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const data = [
    { name: intl.formatMessage({ id: 'tokenomics.distribution.liquidity' }), value: 25 },
    { name: intl.formatMessage({ id: 'tokenomics.distribution.marketing' }), value: 20 },
    { name: intl.formatMessage({ id: 'tokenomics.distribution.development' }), value: 20 },
    { name: intl.formatMessage({ id: 'tokenomics.distribution.otcSales' }), value: 15 },
    { name: intl.formatMessage({ id: 'tokenomics.distribution.partnerships' }), value: 15 },
    { name: intl.formatMessage({ id: 'tokenomics.distribution.team' }), value: 5 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  const chartData: ChartData<'pie'> = {
    labels: data.map(item => item.name),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: COLORS,
        borderColor: COLORS,
        borderWidth: 1,
      },
    ],
  };

  const chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            if (context.parsed !== undefined) {
              return `${context.label}: ${context.parsed}%`;
            }
            return '';
          }
        }
      }
    },
  };

  const distributionItems = [
    { icon: '👥', key: 'team' },
    { icon: '💼', key: 'otcSales' },
    { icon: '🤝', key: 'partnerships' },
    { icon: '📢', key: 'marketing' },
    { icon: '🛠️', key: 'development' },
    { icon: '💧', key: 'liquidity' },
  ];

  const securityAudits = [
    {
      icon: '/imgs/auditors/certik.png',
      title: 'CertiK',
      desc: 'tokenomics.securityAudits.certik.description',
      linkText: 'tokenomics.securityAudits.certik.linkText',
      href: 'https://www.certik.com/projects/dexkit'
    },
    {
      icon: '/imgs/auditors/goplusec.png',
      title: 'GoPlusSecurity',
      desc: 'tokenomics.securityAudits.goplus.description',
      linkText: 'tokenomics.securityAudits.goplus.linkText',
      href: 'https://gopluslabs.io/token-security/1/0x7866e48c74cbfb8183cd1a929cd9b95a7a5cb4f4'
    }
  ];

  const externalAnalytics = [
    { name: 'Forbes', href: 'https://www.forbes.com/digital-assets/assets/dexkit-kit/', icon: '/imgs/analytics/forbes.png' },
    { name: 'CoinMarketCap', href: 'https://coinmarketcap.com/currencies/dexkit', icon: '/imgs/analytics/coinmarketcap.png' },
    { name: 'CoinGecko', href: 'https://www.coingecko.com/en/coins/dexkit', icon: '/imgs/analytics/coingecko.png' },
    { name: 'LiveCoinWatch', href: 'https://www.livecoinwatch.com/price/DexKit-KIT', icon: '/imgs/analytics/livecoinwatch.png' },
    { name: 'Crypto.com', href: 'https://crypto.com/price/dexkit', icon: '/imgs/analytics/crypto-com.png' },
    { name: 'CoinDataFlow', href: 'https://coindataflow.com/en/prediction/dexkit', icon: '/imgs/analytics/coindataflow.png' },
    { name: 'Messari', href: 'https://messari.io/project/dexkit', icon: '/imgs/analytics/messari.png' },
    { name: 'CoinBrain', href: 'https://coinbrain.com/coins/eth-0x7866e48c74cbfb8183cd1a929cd9b95a7a5cb4f4', icon: '/imgs/analytics/coinbrain.png' },
  ];

  return (
    <div className="min-h-screen">
        <div className="text-white py-8 md:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <h1 className={`text-4xl md:text-6xl font-bold mb-4 md:mb-0 ${isMobile ? 'w-full' : 'md:w-1/2'} text-center md:text-left`}>
                {intl.formatMessage({ id: "tokenomics.title" })}
            </h1>
            <p className={`text-lg ${isMobile ? '' : 'sm:text-xl'} ${isMobile ? 'w-full' : 'md:w-1/2'} text-center ${isMobile ? '' : 'md:text-left'}`}>
                {intl.formatMessage({ id: "tokenomics.description" })}
            </p>
            </div>
        </div>
        </div>

      <div className="bg-white text-black">
        <main className="container mx-auto px-4 py-8 md:py-12">
          <section className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {intl.formatMessage({ id: "tokenomics.details.title" })}
            </h2>
            <p className="text-base md:text-lg mb-4">
              {intl.formatMessage({ id: "tokenomics.details.description" })}
            </p>
            <ul className="list-disc list-inside text-base md:text-lg">
              <li>{intl.formatMessage({ id: "tokenomics.details.supply" })}</li>
              <li>{intl.formatMessage({ id: "tokenomics.details.networks" })}</li>
            </ul>
          </section>

          <section className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              {intl.formatMessage({ id: "tokenomics.distribution.title" })}
            </h2>
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="w-full lg:w-1/2 mb-8 lg:mb-0 flex justify-center items-center">
                <div style={{ width: chartSize, height: chartSize }}>
                  <PieChart data={chartData} options={chartOptions} />
                </div>
              </div>
              <div className="w-full lg:w-1/2 lg:pl-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {distributionItems.map((item, index) => (
                    <div key={index} className="bg-gray-100 rounded-lg shadow-lg p-4 transition-all duration-300 hover:shadow-xl hover:scale-105">
                      <div className="flex items-center mb-2">
                        <span className="text-3xl mr-3">{item.icon}</span>
                        <h3 className="text-lg font-semibold text-black">
                          {intl.formatMessage({ id: `tokenomics.distribution.${item.key}.title` })}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-700">
                        {intl.formatMessage({ id: `tokenomics.distribution.${item.key}.description` })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              {intl.formatMessage({ id: "tokenomics.securityAudits.title" })}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {securityAudits.map((audit, index) => (
                <div key={index} className="bg-gray-100 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <div className="flex items-center mb-4">
                    <Image 
                      src={audit.icon}
                      alt={`${audit.title} Logo`}
                      width={48}
                      height={48}
                      className="mr-4"
                    />
                    <h3 className="text-xl font-semibold text-black">
                      {audit.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 mb-4">
                    {intl.formatMessage({ id: audit.desc })}
                  </p>
                  <a 
                    href={audit.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-orange-400 text-black font-bold px-4 py-2 rounded hover:bg-orange-500 transition-colors duration-300"
                  >
                    {intl.formatMessage({ id: audit.linkText })}
                  </a>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              {intl.formatMessage({ id: "tokenomics.externalAnalytics.title" })}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {externalAnalytics.map((site, index) => (
                <a
                  key={index}
                  href={site.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 rounded-lg shadow-lg p-4 transition-all duration-300 hover:shadow-xl hover:scale-105 flex flex-col items-center justify-center"
                >
                  <Image 
                    src={site.icon}
                    alt={`${site.name} Logo`}
                    width={48}
                    height={48}
                    className="mb-2"
                  />
                  <span className="text-sm font-semibold text-black text-center">{site.name}</span>
                </a>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}