import Image from 'next/image'

export default function Partners() {
  const partners = [
    { name: '0x', logo: '/partner-logos/0x.webp' },
    { name: 'Optimism', logo: '/partner-logos/optimism.webp' },
    { name: 'Arbitrum', logo: '/partner-logos/arbitrum.webp' },
    { name: 'Polygon', logo: '/partner-logos/polygon.webp' },
    { name: 'Base', logo: '/partner-logos/base.webp' },
    { name: 'Polygon Studios', logo: '/partner-logos/polygonstudios.webp' },
    { name: 'The Graph', logo: '/partner-logos/thegraph.webp' },
    { name: 'CoinGecko', logo: '/partner-logos/coingecko.webp' },
    { name: 'Chainlink', logo: '/partner-logos/chainlink.webp' },
    { name: 'Crypto.com', logo: '/partner-logos/cryptocom.webp' },
    { name: 'TradingView', logo: '/partner-logos/tradingview.webp' },
    { name: 'Darkblock', logo: '/partner-logos/darkblock.webp' },
    { name: 'Thirdweb', logo: '/partner-logos/thirdweb.webp' },
    { name: 'Gitcoin', logo: '/partner-logos/gitcoin.webp' },
    { name: 'Giveth', logo: '/partner-logos/giveth.webp' },
  ]

  return (
    <section className="py-16 bg-white w-full">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Partners & Integrations</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
          {partners.map((partner) => (
            <div key={partner.name} className="flex justify-center items-center">
              <Image src={partner.logo} alt={partner.name} width={120} height={60} objectFit="contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}