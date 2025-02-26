'use client';

import { useIntl } from 'react-intl';
import LocalizedLink from '@/app/components/LocalizedLink';
import { useEffect, useState } from 'react';

export default function AboutPage() {
  return <AboutPageContent />;
}

function AboutPageContent() {
  const intl = useIntl();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const pageTitle = intl.formatMessage({ id: 'about.title' });
    document.title = `${pageTitle} | DexKit`;
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [intl]);

  return (
    <div className="min-h-screen bg-transparent">
      <main className="container mx-auto px-4 py-12">
        <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mb-8 ${isMobile ? 'px-4' : ''}`}>
          {intl.formatMessage({ id: "about.title" })}
        </h1>
        
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'md:grid-cols-3'} gap-8 mt-12`}>
          <LocalizedLink href="/about/mission-vision-values" className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105">
            <h2 className="text-xl sm:text-2xl font-semibold text-purple-900 mb-4">
              {intl.formatMessage({ id: "about.missionVisionValues" })}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              {intl.formatMessage({ id: "about.missionVisionValuesDesc" })}
            </p>
          </LocalizedLink>

          <LocalizedLink href="/about/our-team" className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105">
            <h2 className="text-xl sm:text-2xl font-semibold text-purple-900 mb-4">
              {intl.formatMessage({ id: "about.ourTeam" })}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              {intl.formatMessage({ id: "about.ourTeamDesc" })}
            </p>
          </LocalizedLink>

          <LocalizedLink href="/about/brand-material" className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105">
            <h2 className="text-xl sm:text-2xl font-semibold text-purple-900 mb-4">
              {intl.formatMessage({ id: "about.brandMaterial" })}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              {intl.formatMessage({ id: "about.brandMaterialDesc" })}
            </p>
          </LocalizedLink>
        </div>
      </main>
    </div>
  );
}
