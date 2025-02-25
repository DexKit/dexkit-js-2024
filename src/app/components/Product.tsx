import Image from 'next/image'
import LocalizedLink from './LocalizedLink'
import { FormattedMessage, useIntl } from 'react-intl'

export default function Product() {
  const intl = useIntl();

  return (
    <section 
      className="py-12 sm:py-16 bg-white w-full"
      aria-label={intl.formatMessage({ id: "product.sectionAriaLabel", defaultMessage: "Our Product" })}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center text-black">
          <FormattedMessage id="product.title" />
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2 text-center md:text-right">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 text-black">
              <FormattedMessage id="product.dexappbuilder.title" />
            </h3>
            <p className="text-base sm:text-lg md:text-xl mb-4 text-black">
              <FormattedMessage id="product.dexappbuilder.description" />
            </p>
            <LocalizedLink 
              href="/dexappbuilder" 
              className="inline-block bg-orange-400 text-black py-2 px-5 rounded-lg hover:bg-orange-500 transition-colors duration-300 text-base sm:text-lg font-semibold"
            >
              <FormattedMessage id="product.learnMore.dexappbuilder" defaultMessage="Learn more about DexAppBuilder"/>
            </LocalizedLink>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-start">
            <Image
              src="/imgs/platform.webp"
              alt={intl.formatMessage({ id: "product.dexappbuilder.imageAlt", defaultMessage: "DexAppBuilder Platform" })}
              width={450}
              height={450}
              className="w-full max-w-sm sm:max-w-md md:max-w-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}