'use client';

import { useIntl } from 'react-intl';
import Link from 'next/link';
import { useLocale } from '@/app/i18n/client';

interface LocalizedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

function LocalizedLink({ href, ...rest }: LocalizedLinkProps) {
  const { locale } = useLocale();

  const localizedHref = locale === 'en' ? href : `/${locale}${href}`;

  return <Link href={localizedHref} {...rest} />;
}

export default function AboutPage() {
  return <AboutPageContent />;
}

function AboutPageContent() {
  const intl = useIntl();

  return (
    <div className="min-h-screen bg-transparent">
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-center text-white mb-8">
          {intl.formatMessage({ id: "about.title" })}
        </h1>
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <LocalizedLink href="/about/mission-vision-values" className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105">
            <h2 className="text-2xl font-semibold text-purple-900 mb-4">
              {intl.formatMessage({ id: "about.missionVisionValues" })}
            </h2>
            <p className="text-gray-600">
              {intl.formatMessage({ id: "about.missionVisionValuesDesc" })}
            </p>
          </LocalizedLink>

          <LocalizedLink href="/about/our-team" className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105">
            <h2 className="text-2xl font-semibold text-purple-900 mb-4">
              {intl.formatMessage({ id: "about.ourTeam" })}
            </h2>
            <p className="text-gray-600">
              {intl.formatMessage({ id: "about.ourTeamDesc" })}
            </p>
          </LocalizedLink>

          <LocalizedLink href="/about/brand-material" className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105">
            <h2 className="text-2xl font-semibold text-purple-900 mb-4">
              {intl.formatMessage({ id: "about.brandMaterial" })}
            </h2>
            <p className="text-gray-600">
              {intl.formatMessage({ id: "about.brandMaterialDesc" })}
            </p>
          </LocalizedLink>
        </div>
      </main>
    </div>
  );
}