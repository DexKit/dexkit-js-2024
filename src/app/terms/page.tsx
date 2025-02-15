'use client';

import { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

const sections = [
  {
    titleKey: 'terms.eligibility.title',
    tldrKey: 'terms.eligibility.tldr',
    contentKeys: [
      'terms.eligibility.content1',
      'terms.eligibility.content2',
      'terms.eligibility.content3',
      'terms.eligibility.content4'
    ]
  },
  {
    titleKey: 'terms.complianceObligations.title',
    tldrKey: 'terms.complianceObligations.tldr',
    contentKeys: [
      'terms.complianceObligations.content1',
      'terms.complianceObligations.content2',
      'terms.complianceObligations.content3',
      'terms.complianceObligations.content4',
      'terms.complianceObligations.content5'
    ]
  },
  {
    titleKey: 'terms.accessToTheInterface.title',
    tldrKey: 'terms.accessToTheInterface.tldr',
    contentKeys: [
      'terms.accessToTheInterface.content1',
      'terms.accessToTheInterface.content2',
      'terms.accessToTheInterface.content3'
    ]
  },
  {
    titleKey: 'terms.yourUseOfTheInterface.title',
    tldrKey: 'terms.yourUseOfTheInterface.tldr',
    contentKeys: [
      'terms.yourUseOfTheInterface.content1',
      'terms.yourUseOfTheInterface.content2',
      'terms.yourUseOfTheInterface.content3',
      'terms.yourUseOfTheInterface.content4',
      'terms.yourUseOfTheInterface.content5'
    ]
  },
  {
    titleKey: 'terms.disclaimers.title',
    tldrKey: 'terms.disclaimers.tldr',
    contentKeys: [
      'terms.disclaimers.content1',
      'terms.disclaimers.content2',
      'terms.disclaimers.content3',
      'terms.disclaimers.content4',
      'terms.disclaimers.content5'
    ]
  },
  {
    titleKey: 'terms.intellectualPropertyRights.title',
    tldrKey: 'terms.intellectualPropertyRights.tldr',
    contentKeys: [
      'terms.intellectualPropertyRights.content1',
      'terms.intellectualPropertyRights.content2',
      'terms.intellectualPropertyRights.content3',
      'terms.intellectualPropertyRights.content4',
      'terms.intellectualPropertyRights.content5'
    ]
  },
  {
    titleKey: 'terms.indemnification.title',
    tldrKey: 'terms.indemnification.tldr',
    contentKeys: [
      'terms.indemnification.content1',
      'terms.indemnification.content2',
      'terms.indemnification.content3'
    ]
  },
  {
    titleKey: 'terms.limitationOfLiability.title',
    tldrKey: 'terms.limitationOfLiability.tldr',
    contentKeys: [
      'terms.limitationOfLiability.content1',
      'terms.limitationOfLiability.content2'
    ]
  },
  {
    titleKey: 'terms.arbitrationAndClassActionWaiver.title',
    tldrKey: 'terms.arbitrationAndClassActionWaiver.tldr',
    contentKeys: [
      'terms.arbitrationAndClassActionWaiver.content1',
      'terms.arbitrationAndClassActionWaiver.content2',
      'terms.arbitrationAndClassActionWaiver.content3'
    ]
  },
  {
    titleKey: 'terms.changesToTheTerms.title',
    tldrKey: 'terms.changesToTheTerms.tldr',
    contentKeys: [
      'terms.changesToTheTerms.content1',
      'terms.changesToTheTerms.content2'
    ]
  },
  {
    titleKey: 'terms.miscellaneous.title',
    tldrKey: 'terms.miscellaneous.tldr',
    contentKeys: [
      'terms.miscellaneous.content1',
      'terms.miscellaneous.content2',
      'terms.miscellaneous.content3'
    ]
  },
  {
    titleKey: 'terms.contact.title',
    tldrKey: 'terms.contact.tldr',
    contentKeys: [
      'terms.contact.content1',
      'terms.contact.content2',
      'terms.contact.content3'
    ]
  }
];

export default function Terms() {
  const intl = useIntl();

  useEffect(() => {
    document.title = intl.formatMessage({ id: 'terms.page.title' });
  }, [intl]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="text-center sm:text-left mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3 text-gray-900">
            <FormattedMessage id="terms.page.heading" />
          </h1>
          <p className="text-sm sm:text-base text-gray-500">
            <FormattedMessage 
              id="terms.lastUpdated" 
              values={{ date: '2025-02-14' }} 
            />
          </p>
        </div>
        
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
              <FormattedMessage 
                id="terms.welcome" 
                values={{
                  link: (chunks) => (
                    <a href="https://dexkit.com" className="text-orange-400 hover:text-orange-500 transition-colors">
                      {chunks}
                    </a>
                  )
                }}
              />
            </p>
          </div>

          {sections.map((section, index) => (
            <section key={index} className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 text-gray-900 flex items-center">
                <span className="bg-orange-400 text-white w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mr-2 sm:mr-3 text-xs sm:text-sm font-bold">
                  {index + 1}
                </span>
                <FormattedMessage id={section.titleKey} />
              </h2>
              
              {section.tldrKey && (
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg mb-3 sm:mb-4 border-l-4 border-orange-400">
                  <p className="text-sm sm:text-base text-gray-700">
                    <span className="font-semibold text-orange-400 mr-2">TL;DR:</span>
                    <FormattedMessage id={section.tldrKey} />
                  </p>
                </div>
              )}

              <div className="space-y-2 sm:space-y-3 text-gray-600">
                {section.contentKeys.map((contentKey, idx) => (
                  <p key={idx} className="text-sm sm:text-base leading-relaxed">
                    <FormattedMessage id={contentKey} />
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
} 