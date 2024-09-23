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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center text-black">
            <FormattedMessage id="problems.title" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {problems.map((problem, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-center sm:items-start">
                <div className="mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
                  <Image 
                    src={problem.icon} 
                    alt={intl.formatMessage({ id: problem.titleId })}
                    width={80} 
                    height={80}
                    className={`${index % 2 === 0 ? "text-purple-600" : "text-orange-400"} w-16 h-16 sm:w-20 sm:h-20`}
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-black">
                    <FormattedMessage id={problem.titleId} />
                  </h3>
                  <p className="text-gray-700 text-base sm:text-lg md:text-xl">
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