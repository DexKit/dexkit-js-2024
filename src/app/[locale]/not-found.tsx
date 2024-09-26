'use client';

import { FormattedMessage } from 'react-intl';
import LocalizedLink from '@/app/components/LocalizedLink';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">
        <FormattedMessage id="notFound.title" defaultMessage="404" />
      </h1>
      <p className="text-2xl text-gray-600 mb-8">
        <FormattedMessage id="notFound.message" defaultMessage="Oops! Page not found." />
      </p>
      <LocalizedLink href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        <FormattedMessage id="notFound.returnHome" defaultMessage="Return to Home" />
      </LocalizedLink>
    </div>
  );
}