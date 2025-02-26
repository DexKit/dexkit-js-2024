'use client';

import { FormattedMessage } from 'react-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FaHome } from 'react-icons/fa';

export default function NotFound() {
  const { locale } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <Image
          src="/imgs/dexkit-logo-black-d.svg"
          alt="DexKit Logo"
          width={80}
          height={80}
          className="mx-auto mb-6"
        />
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          <FormattedMessage id="notFound.title" defaultMessage="Oops! Page Not Found" />
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-600">
          <FormattedMessage id="notFound.message" />
        </p>
        <Link 
          href={`/${locale}`}
          className="inline-flex items-center justify-center bg-[#8B5CF6] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#7C3AED] transition-colors text-base sm:text-lg"
        >
          <FaHome className="mr-2" />
          <FormattedMessage id="notFound.returnHome" />
        </Link>
      </div>
    </div>
  );
}