'use client';

import Image from 'next/image'
import { FormattedMessage, useIntl } from 'react-intl'

export default function Hero() {
  const intl = useIntl();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center max-w-6xl">
        <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left md:pr-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
            <FormattedMessage
              id="hero.title"
              defaultMessage="Create your own<br />branded <span>DApps.</span>"
              values={{
                br: <br />,
                span: (chunks) => <span className="text-orange-400">{chunks}</span>
              }}
            />
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 text-white">
            <FormattedMessage
              id="hero.subtitle"
              defaultMessage="With DexKit's no-code/low-code tools."
            />
          </p>
          <a 
            href="https://dexappbuilder.dexkit.com"
            className="inline-block bg-orange-400 text-black py-2 px-4 sm:py-3 sm:px-6 rounded-lg hover:bg-orange-500 transition-colors duration-300 text-sm sm:text-base md:text-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FormattedMessage
              id="hero.cta"
              defaultMessage="Start now!"
            />
          </a>
        </div>
        <div className="md:w-1/2 flex justify-center md:justify-start">
          <Image
            src="/imgs/web3.webp"
            alt={intl.formatMessage({ id: 'hero.imageAlt', defaultMessage: "DexKit Web3 Illustration showcasing decentralized application building" })}
            width={350}
            height={350}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
          />
        </div>
      </div>
    </div>
  )
}