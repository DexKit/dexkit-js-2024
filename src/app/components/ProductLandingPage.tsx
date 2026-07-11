'use client';

import { FormattedMessage, useIntl } from 'react-intl';
import Link from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';
import LocalizedLink from '@/app/components/LocalizedLink';
import type { ProductPageConfig } from '@/app/utils/product-pages';

const NETWORK_KEYS = Array.from({ length: 10 }, (_, index) => `dexappbuilder.networks.${index}`);
const YIELD_BY_DEXKIT_URL = 'https://yield.dexkit.com';

type ProductLandingPageProps = {
  config: ProductPageConfig;
};

export default function ProductLandingPage({ config }: ProductLandingPageProps) {
  const intl = useIntl();
  const { slug, featureCount, stepCount, faqCount, showNetworks, ctaUrl, ctaMessageId, docsUrl, tutorials, extraSections } = config;

  const featureItems = Array.from({ length: featureCount }, (_, index) => `${slug}.features.${index + 1}`);
  const stepItems = Array.from({ length: stepCount }, (_, index) => index + 1);
  const faqItems = Array.from({ length: faqCount }, (_, index) => index + 1);

  return (
    <article className="min-h-screen">
      <header className="text-white py-8 sm:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold w-full md:w-1/2 text-center md:text-left">
              <FormattedMessage id={`${slug}.title`} />
            </h1>
            <p className="text-base sm:text-lg md:text-xl w-full md:w-1/2 text-center md:text-left text-white/90 leading-relaxed">
              <FormattedMessage id={`${slug}.subtitle`} />
            </p>
          </div>
        </div>
      </header>

      <div className="bg-white text-black">
        <div className="container mx-auto px-4 py-8 sm:py-12 max-w-3xl">
          <div className="space-y-12">
            <section aria-labelledby={`${slug}-overview`}>
              <h2 id={`${slug}-overview`} className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                <FormattedMessage id={`${slug}.sections.overview`} />
              </h2>
              <div className="space-y-4 text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                <p>
                  <FormattedMessage id={`${slug}.description.paragraph1`} />
                </p>
                <p>
                  <FormattedMessage id={`${slug}.description.paragraph2`} />
                </p>
              </div>
              <Link
                href={docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-orange-500 hover:underline text-sm sm:text-base font-medium"
              >
                <FormattedMessage id={`${slug}.overviewLink`} />
              </Link>
            </section>

            <section aria-labelledby={`${slug}-features`}>
              <h2 id={`${slug}-features`} className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                <FormattedMessage id={`${slug}.sections.features`} />
              </h2>
              <ul className="list-disc pl-5 space-y-3 text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                {featureItems.map((id) => (
                  <li key={id}>
                    <FormattedMessage id={id} />
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby={`${slug}-how-it-works`}>
              <h2 id={`${slug}-how-it-works`} className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                <FormattedMessage id={`${slug}.sections.howItWorks`} />
              </h2>
              <ol className="space-y-5">
                {stepItems.map((step) => (
                  <li key={step} className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      <FormattedMessage id={`${slug}.howItWorks.step${step}.title`} />
                    </h3>
                    <p>
                      <FormattedMessage id={`${slug}.howItWorks.step${step}.body`} />
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            {extraSections?.map((section) => (
              <section key={section.id} aria-labelledby={`${slug}-${section.id}`}>
                <h2 id={`${slug}-${section.id}`} className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  <FormattedMessage id={section.titleId} />
                </h2>
                <ul className="list-disc pl-5 space-y-3 text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                  {section.itemIds.map((id) => (
                    <li key={id}>
                      <FormattedMessage id={id} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            {showNetworks && (
              <section aria-labelledby={`${slug}-networks`}>
                <h2 id={`${slug}-networks`} className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  <FormattedMessage id={`${slug}.sections.networks`} />
                </h2>
                <p className="mb-4 text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                  <FormattedMessage id={`${slug}.sections.networksIntro`} />
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-700">
                  {NETWORK_KEYS.map((id) => (
                    <li key={id}>{intl.formatMessage({ id })}</li>
                  ))}
                </ul>
              </section>
            )}

            <section aria-labelledby={`${slug}-audience`}>
              <h2 id={`${slug}-audience`} className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                <FormattedMessage id={`${slug}.sections.whoIsItFor`} />
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                <FormattedMessage id={`${slug}.whoIsItFor.body`} />
              </p>
            </section>

            <section aria-labelledby={`${slug}-faq`}>
              <h2 id={`${slug}-faq`} className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                <FormattedMessage id={`${slug}.sections.faq`} />
              </h2>
              <dl className="space-y-6">
                {faqItems.map((n) => (
                  <div key={n}>
                    <dt className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                      <FormattedMessage id={`${slug}.faq.q${n}`} />
                    </dt>
                    <dd className="text-sm sm:text-base text-gray-700 leading-relaxed">
                      <FormattedMessage id={`${slug}.faq.a${n}`} />
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section aria-labelledby={`${slug}-tutorials`}>
              <h2 id={`${slug}-tutorials`} className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                <FormattedMessage id={`${slug}.sections.tutorials`} />
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                {tutorials.map((tutorial) => (
                  <li key={tutorial.titleId} className="text-sm sm:text-base md:text-lg">
                    <Link
                      href={tutorial.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 hover:text-orange-600 hover:underline"
                    >
                      <FormattedMessage id={tutorial.titleId} />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby={`${slug}-related`} className="border-t border-gray-200 pt-8">
              <h2 id={`${slug}-related`} className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                <FormattedMessage id={`${slug}.sections.related`} />
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
                <FormattedMessage id={`${slug}.related.body`} />
              </p>
              <div className="flex flex-wrap gap-3 text-sm sm:text-base">
                {slug === 'dexappbuilder' ? (
                  <>
                    <LocalizedLink href="/dexswap" className="text-orange-500 hover:underline font-medium">
                      <FormattedMessage id="product.dexswap.title" />
                    </LocalizedLink>
                    <span className="text-gray-400" aria-hidden="true">·</span>
                    <LocalizedLink href="/dexwallet" className="text-orange-500 hover:underline font-medium">
                      <FormattedMessage id="product.dexwallet.title" />
                    </LocalizedLink>
                    <span className="text-gray-400" aria-hidden="true">·</span>
                    <LocalizedLink href="/dexexchangepro" className="text-orange-500 hover:underline font-medium">
                      <FormattedMessage id="product.dexexchangepro.title" />
                    </LocalizedLink>
                    <span className="text-gray-400" aria-hidden="true">·</span>
                    <Link
                      href={YIELD_BY_DEXKIT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 hover:underline font-medium"
                    >
                      <FormattedMessage id="product.yield.title" />
                    </Link>
                    <span className="text-gray-400" aria-hidden="true">·</span>
                    <Link
                      href="https://dexappbuilder.dexkit.com/solutions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 hover:underline font-medium"
                    >
                      <FormattedMessage id={`${slug}.related.solutions`} />
                    </Link>
                  </>
                ) : (
                  <>
                    <LocalizedLink href="/dexappbuilder" className="text-orange-500 hover:underline font-medium">
                      <FormattedMessage id="product.dexappbuilder.title" />
                    </LocalizedLink>
                    <span className="text-gray-400" aria-hidden="true">·</span>
                    <Link
                      href={YIELD_BY_DEXKIT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 hover:underline font-medium"
                    >
                      <FormattedMessage id="product.yield.title" />
                    </Link>
                    <span className="text-gray-400" aria-hidden="true">·</span>
                    <Link
                      href="https://dexappbuilder.dexkit.com/solutions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 hover:underline font-medium"
                    >
                      <FormattedMessage id={`${slug}.related.solutions`} />
                    </Link>
                  </>
                )}
              </div>
            </section>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-200">
            <Link
              href={ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-orange-400 text-black py-2.5 px-5 sm:px-6 rounded hover:bg-orange-500 transition duration-300 text-sm sm:text-base md:text-lg font-medium"
            >
              <FaExternalLinkAlt className="mr-2 shrink-0" aria-hidden="true" />
              {intl.formatMessage({ id: ctaMessageId ?? `${slug}.openSolution` })}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
