'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { FormattedMessage, IntlProvider } from 'react-intl';
import messages from '@/app/i18n/messages';
import Image from 'next/image';
import { FaHome } from 'react-icons/fa';
import { locales } from './i18n/config';

type ValidLocale = keyof typeof messages;

function isValidLocale(locale: string): locale is ValidLocale {
  return locales.includes(locale as ValidLocale);
}

export default function NotFound() {
  const params = useParams();
  const router = useRouter();
  const localeParam = params?.locale as string;
  const locale = isValidLocale(localeParam) ? localeParam : (locales[0] as ValidLocale);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(`/${locale}`);
  };

  return (
    <IntlProvider messages={messages[locale]} locale={locale} defaultLocale="en">
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-white bg-opacity-90 p-8 rounded-lg shadow-2xl max-w-md w-full">
          <Image
            src="/imgs/dexkit-logo-black-d.svg"
            alt="DexKit Logo"
            width={100}
            height={100}
            className="mx-auto mb-6"
          />
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            <FormattedMessage id='notFound.title' defaultMessage='Oops! Page Not Found' />
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            <FormattedMessage id='notFound.message' defaultMessage='The page you are looking for might have been removed or is temporarily unavailable.' />
          </p>
          <Link 
            href={`/${locale}`}
            onClick={handleClick}
            className="inline-flex items-center bg-orange-400 text-black px-6 py-3 rounded-md text-lg font-semibold hover:bg-orange-500 transition duration-300"
          >
            <FaHome className="mr-2" />
            <FormattedMessage id='notFound.returnHome' defaultMessage='Start now!' />
          </Link>
        </div>
      </div>
    </IntlProvider>
  );
}