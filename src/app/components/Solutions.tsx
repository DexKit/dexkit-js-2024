import Link from 'next/link'

export default function Solutions() {
  const solutions = [
    {
      name: 'DexNFTMarket',
      description: 'Unlock the potential of your digital art and profit from your creativity selling your creations, from NFTs to DApp designs.',
    },
    {
      name: 'DexNFTStore',
      description: 'Maximize your NFT sales with a Shopify-like platform for NFT creators.',
    },
    {
      name: 'DexGenerator',
      description: 'Deploy open-source, secure smart contracts on the blockchain with ease, and seamlessly integrate them with prebuilt user interfaces.',
    },
    {
      name: 'DexSwap',
      description: 'Deploy your own branded DEX aggregator and swap cryptocurrencies smarter and efficiently with real-time prices and zero-cost gas fees.',
    },
    {
      name: 'DexExchangePro',
      description: 'Your professional and secure decentralized exchange. No intermediaries, no hassle.',
    },
    {
      name: 'DexWallet',
      description: 'Your crypto companion: Manage and custody your cryptocurrencies and NFTs with ease.',
    },
  ]

  return (
    <section className="py-12 sm:py-16 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center text-white">Solutions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {solutions.map((solution) => (
            <div key={solution.name} className="relative pt-10">
              <div className="absolute top-0 left-4 z-10">
                <h3 className="text-lg sm:text-xl font-semibold bg-orange-400 text-black py-2 px-4 rounded-lg inline-block">
                  {solution.name}
                </h3>
              </div>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden p-4 sm:p-6 pt-8">
                <p className="text-gray-700 mb-4 text-base sm:text-lg">{solution.description}</p>
                <div className="text-right">
                  <Link href={`/${solution.name.toLowerCase()}`} className="text-gray-400 hover:text-orange-400 text-sm sm:text-base">
                    Learn more
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}