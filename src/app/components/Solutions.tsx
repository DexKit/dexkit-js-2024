import LocalizedLink from './LocalizedLink'
import { FormattedMessage, useIntl } from 'react-intl'
import Head from 'next/head'

export default function Solutions() {
  const intl = useIntl();
  const solutions = [
    'dexnftmarket',
    'dexnftstore',
    'dexgenerator',
    'dexswap',
    'dexexchangepro',
    'dexwallet'
  ]

  return (
    <>
      <Head>
        {solutions.map((solution) => (
          <meta
            key={`description-${solution}`}
            name={`description-${solution}`}
            content={intl.formatMessage({ id: `solutions.${solution}.description` })}
          />
        ))}
      </Head>
      <section 
        className="py-12 sm:py-16 w-full"
        aria-label={intl.formatMessage({ id: "solutions.sectionAriaLabel", defaultMessage: "Our Solutions" })}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center text-white">
            <FormattedMessage id="solutions.title" />
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {solutions.map((solution) => (
              <div key={solution} className="flex flex-col h-full">
                <div className="relative pt-10 flex-grow">
                  <div className="absolute top-0 left-4 z-10">
                    <h3 className="text-lg sm:text-xl font-semibold bg-orange-400 text-black py-2 px-4 rounded-lg inline-block">
                      <FormattedMessage id={`solutions.${solution}.title`} />
                    </h3>
                  </div>
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden p-4 sm:p-6 pt-8 h-full flex flex-col">
                    <p className="text-gray-700 mb-4 text-sm sm:text-base md:text-lg flex-grow">
                      <FormattedMessage id={`solutions.${solution}.description`} />
                    </p>
                    <div className="text-right mt-auto">
                      <LocalizedLink href={`/${solution}`} className="text-gray-400 hover:text-orange-400 text-sm sm:text-base transition-colors duration-200">
                        <FormattedMessage id={`solutions.${solution}.learnMore`} defaultMessage={`Learn more about ${solution}`} />
                      </LocalizedLink>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}