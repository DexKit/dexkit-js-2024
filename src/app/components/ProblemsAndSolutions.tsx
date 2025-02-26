'use client';

import Image from 'next/image'
import { FormattedMessage, useIntl } from 'react-intl'

export default function ProblemsAndSolutions() {
    const intl = useIntl();
    const problems = [
      {
        titleId: "problems.accessibility.title",
        descriptionId: "problems.accessibility.description",
        icon: "/imgs/accesibility.svg"
      },
      {
        titleId: "problems.nocode.title",
        descriptionId: "problems.nocode.description",
        icon: "/imgs/nocode.svg"
      },
      {
        titleId: "problems.branding.title",
        descriptionId: "problems.branding.description",
        icon: "/imgs/brand.svg"
      },
      {
        titleId: "problems.easyDapps.title",
        descriptionId: "problems.easyDapps.description",
        icon: "/imgs/easy.svg"
      },
      {
        titleId: "problems.limitedOwnership.title",
        descriptionId: "problems.limitedOwnership.description",
        icon: "/imgs/limited.svg"
      },
      {
        titleId: "problems.nftOwnership.title",
        descriptionId: "problems.nftOwnership.description",
        icon: "/imgs/ownership.svg"
      }
    ];
  
    return (
      <section 
        className="py-12 sm:py-16 bg-white w-full"
        aria-label={intl.formatMessage({ id: "problems.sectionAriaLabel", defaultMessage: "Problems and Solutions" })}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center text-gray-800">
            <FormattedMessage id="problems.title" defaultMessage="What problems exist in the ecosystem and how we help solve them?" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {problems.map((problem, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-4 relative">
                    <Image 
                      src={problem.icon} 
                      alt="" 
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">
                    <FormattedMessage id={problem.titleId} />
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    <FormattedMessage id={problem.descriptionId} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }