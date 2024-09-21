'use client';

import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';

export default function MissionVisionContent() {
  const intl = useIntl();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const values = [
    { icon: '🔒', title: 'value1Title', desc: 'value1Desc' },
    { icon: '💰', title: 'value2Title', desc: 'value2Desc' },
    { icon: '👫', title: 'value3Title', desc: 'value3Desc' },
    { icon: '🆕', title: 'value4Title', desc: 'value4Desc' },
    { icon: '📱', title: 'value5Title', desc: 'value5Desc' },
    { icon: '🤝', title: 'value6Title', desc: 'value6Desc' },
    { icon: '✅', title: 'value7Title', desc: 'value7Desc' },
  ];

  return (
    <div className="min-h-screen bg-transparent">
      <div className="text-white py-8 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <h1 className={`text-4xl md:text-6xl font-bold mb-4 md:mb-0 ${isMobile ? 'w-full' : 'md:w-1/2'} text-center md:text-left`}>
              {intl.formatMessage({ id: "missionVisionValues.title" })}
            </h1>
            <p className={`text-lg md:text-xl ${isMobile ? 'w-full' : 'md:w-1/2 md:pl-4'} text-center md:text-left`}>
              {intl.formatMessage({ id: "missionVisionValues.description" })}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <main className="container mx-auto px-4 py-12">
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-purple-900 mb-4">
              {intl.formatMessage({ id: "missionVisionValues.missionTitle" })}
            </h2>
            <p className="text-gray-700">
              {intl.formatMessage({ id: "missionVisionValues.missionDesc" })}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-purple-900 mb-4">
              {intl.formatMessage({ id: "missionVisionValues.visionTitle" })}
            </h2>
            <p className="text-gray-700">
              {intl.formatMessage({ id: "missionVisionValues.visionDesc" })}
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-purple-900 mb-8">
              {intl.formatMessage({ id: "missionVisionValues.valuesTitle" })}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <div className="flex items-center mb-4">
                    <span className="text-4xl mr-4">{value.icon}</span>
                    <h3 className="text-xl font-semibold text-purple-900">
                      {intl.formatMessage({ id: `missionVisionValues.${value.title}` })}
                    </h3>
                  </div>
                  <p className="text-gray-700">
                    {intl.formatMessage({ id: `missionVisionValues.${value.desc}` })}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
