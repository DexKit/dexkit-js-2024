import Image from 'next/image'

export default function WhatIsDexKit() {
    return (
      <section className="py-12 sm:py-16 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 relative mb-8 md:mb-0 md:pr-8">
            <div className="relative w-full max-w-md mx-auto md:ml-auto">
              <Image
                src="/imgs/worker.webp"
                alt="DexKit Worker"
                width={500}
                height={500}
                className="relative z-10 w-full"
              />
              <Image
                src="/imgs/d-letter.webp"
                alt="D Letter"
                width={768}
                height={969}
                className="absolute top-0 left-0 z-0 opacity-30 w-full"
              />
            </div>
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">What is DexKit?</h2>
            <p className="mb-4 text-base sm:text-lg md:text-xl">
              DexKit is a blockchain software company committed to making Decentralized Finance (DeFi) accessible to everyone.
            </p>
            <p className="mb-4 text-base sm:text-lg md:text-xl">
              Our suite of no-code/low-code tools and solutions empower entrepreneurs to effortlessly create branded DApps (decentralized applications) in the Web3 space while ensuring complete ownership and control over their creations.
            </p>
            <p className="mb-4 text-base sm:text-lg md:text-xl">
              At DexKit, we believe that DeFi has the potential to revolutionize the financial industry, and we are dedicated to building this technology.
            </p>
          </div>
        </div>
      </section>
    )
  }