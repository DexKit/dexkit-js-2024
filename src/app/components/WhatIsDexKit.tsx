'use client';

import Image from 'next/image'
import { FormattedMessage, useIntl } from 'react-intl'

export default function WhatIsDexKit() {
    const intl = useIntl();

    return (
      <section 
        className="py-12 sm:py-16 text-white"
        aria-label={intl.formatMessage({ id: "whatisdexkit.sectionAriaLabel", defaultMessage: "What is DexKit" })}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 relative mb-8 md:mb-0 md:pr-8">
            <div className="relative w-full max-w-md mx-auto md:ml-auto">
              <Image
                src="/imgs/worker.webp"
                alt={intl.formatMessage({ id: "whatisdexkit.workerImageAlt", defaultMessage: "DexKit Worker" })}
                width={500}
                height={500}
                className="relative z-10 w-full"
              />
              <Image
                src="/imgs/d-letter.webp"
                alt={intl.formatMessage({ id: "whatisdexkit.dLetterImageAlt", defaultMessage: "D Letter" })}
                width={768}
                height={969}
                className="absolute top-0 left-0 z-0 opacity-30 w-full"
              />
            </div>
          </div>  
          <div className="md:w-1/2 md:pl-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              <FormattedMessage id="whatisdexkit.title" />
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-4">
              <FormattedMessage id="whatisdexkit.description1" />
            </p>
            <p className="text-base sm:text-lg md:text-xl mb-4">
              <FormattedMessage id="whatisdexkit.description2" />
            </p>
            <p className="text-base sm:text-lg md:text-xl mb-4">
              <FormattedMessage id="whatisdexkit.description3" />
            </p>
          </div>
        </div>
      </section>
    )
  }