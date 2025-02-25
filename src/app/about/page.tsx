'use client';

import { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

export default function About() {
  const intl = useIntl();

  useEffect(() => {
    document.title = intl.formatMessage({ id: 'about.page.title' });
  }, [intl]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="text-center md:text-left mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900">
            <FormattedMessage id="about.page.heading" />
          </h1>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              <FormattedMessage id="about.page.description" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}