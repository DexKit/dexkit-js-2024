'use client';

import Image from 'next/image'
import Link from 'next/link'
import { FormattedMessage } from 'react-intl'

export default function Partners() {
  const partners = [
    { name: '0x', logo: '/partner-logos/0x.svg', url: 'https://0x.org' },
    { name: 'Optimism', logo: '/partner-logos/optimism.svg', url: 'https://optimism.io/' },
    { name: 'Arbitrum', logo: '/partner-logos/arbitrum.svg', url: 'https://arbitrum.io/' },
    { name: 'Polygon', logo: '/partner-logos/polygon.svg', url: 'https://polygon.technology/' },
    { name: 'Base', logo: '/partner-logos/base.svg', url: 'https://base.org' },
    { name: 'Polygon Studios', logo: '/partner-logos/polygonstudios.svg', url: 'https://polygonstudios.com/' },
    { name: 'The Graph', logo: '/partner-logos/thegraph.svg', url: 'https://thegraph.com/' },
    { name: 'CoinGecko', logo: '/partner-logos/coingecko.svg', url: 'https://www.coingecko.com/' },
    { name: 'Chainlink', logo: '/partner-logos/chainlink.svg', url: 'https://chain.link/' },
    { name: 'Crypto.com', logo: '/partner-logos/cryptocom.svg', url: 'https://crypto.com' },
    { name: 'TradingView', logo: '/partner-logos/tradingview.svg', url: 'https://www.tradingview.com/' },
    { name: 'Darkblock', logo: '/partner-logos/darkblock.webp', url: 'https://darkblock.io/' },
    { name: 'Thirdweb', logo: '/partner-logos/thirdweb.svg', url: 'https://thirdweb.com/' },
    { name: 'Gitcoin', logo: '/partner-logos/gitcoin.svg', url: 'https://www.gitcoin.co/' },
    { name: 'Giveth', logo: '/partner-logos/giveth.svg', url: 'https://giveth.io/' },
  ]

  return (
    <section className="py-12 sm:py-16 bg-white w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center text-gray-800">
          <FormattedMessage id="partners.title" defaultMessage="Partners and Integrations" />
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 items-center">
          {partners.map((partner) => (
            <Link 
              key={partner.name} 
              href={partner.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex justify-center items-center transition-transform duration-300 hover:scale-110"
            >
              <div className="w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 relative flex items-center justify-center">
                <Image 
                  src={partner.logo} 
                  alt={partner.name} 
                  fill
                  className="object-contain p-2"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}