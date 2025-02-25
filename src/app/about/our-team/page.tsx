'use client';

import { useState, useEffect } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import Image from 'next/image';
import { FaXTwitter, FaLinkedin, FaGithub } from 'react-icons/fa6';

interface SocialMedia {
  twitter?: string;
  linkedin?: string;
  github?: string;
}

interface TeamMember {
  name: string;
  role: string;
  title: string;
  imageUrl: string;
  bio: string;
  order: number;
  socialMedia: SocialMedia;
}

export default function OurTeam() {
  const intl = useIntl();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const pageTitle = intl.formatMessage({ id: 'ourTeam.title' });
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

  const teamMembers: TeamMember[] = [
    {
      name: "João Campos",
      role: intl.formatMessage({ id: "ourTeam.role1" }),
      title: intl.formatMessage({ id: "ourTeam.title1" }),
      imageUrl: "/imgs/team/joao.jpg",
      bio: intl.formatMessage({ id: "ourTeam.bio1" }),
      order: 1,
      socialMedia: {
        twitter: "https://twitter.com/joaocampos89",
        linkedin: "https://br.linkedin.com/in/joaocampos89",
        github: "https://github.com/JoaoCampos89"
      }
    },
    {
      name: "Mariama Saskya",
      role: intl.formatMessage({ id: "ourTeam.role2" }),
      title: intl.formatMessage({ id: "ourTeam.title2" }),
      imageUrl: "/imgs/team/mariama.jpg",
      bio: intl.formatMessage({ id: "ourTeam.bio2" }),
      order: 2,
      socialMedia: {
        linkedin: "https://br.linkedin.com/in/mariama-saskya"
      }
    },
    {
      name: "Eliécer Hernández",
      role: intl.formatMessage({ id: "ourTeam.role3" }),
      title: intl.formatMessage({ id: "ourTeam.title3" }),
      imageUrl: "/imgs/team/eliecer.jpg",
      bio: intl.formatMessage({ id: "ourTeam.bio3" }),
      order: 3,
      socialMedia: {
        twitter: "https://twitter.com/eliecerhf",
        linkedin: "https://www.linkedin.com/in/eliecerhf/",
        github: "https://github.com/eliecerhf"
      }
    },
  ];

  const sortedTeamMembers = teamMembers.sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-transparent">
      <div className="text-white py-8 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-0 ${isMobile ? 'w-full' : 'md:w-1/2'} text-center md:text-left`}>
              <FormattedMessage id="ourTeam.title" />
            </h1>
            <p className={`text-sm sm:text-base md:text-lg ${isMobile ? 'w-full' : 'md:w-1/2 md:pl-4'} text-center md:text-left`}>
              <FormattedMessage id="ourTeam.description" />
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <main className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedTeamMembers.map((member, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col h-full"
              >
                <div className="relative w-40 h-40 mx-auto mb-4 rounded-full shadow-lg overflow-hidden border-2 border-gray-200">
                  <Image 
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    sizes="160px"
                    className="rounded-full object-cover object-center"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-lg sm:text-xl font-semibold text-black mb-1">{member.name}</h2>
                  <p className="text-sm sm:text-base font-medium text-orange-500 mb-2">{member.title}</p>
                  <p className="text-sm sm:text-base font-medium text-gray-800 bg-gray-100 px-3 py-1 rounded-full inline-block mb-2">{member.role}</p>
                  <p className="text-sm sm:text-base text-gray-600 mb-3 flex-grow">{member.bio}</p>
                  <div className="flex justify-start space-x-4 mt-auto">
                    {member.socialMedia.twitter && (
                      <a href={member.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                        <FaXTwitter size={20} />
                      </a>
                    )}
                    {member.socialMedia.linkedin && (
                      <a href={member.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
                        <FaLinkedin size={20} />
                      </a>
                    )}
                    {member.socialMedia.github && (
                      <a href={member.socialMedia.github} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-black">
                        <FaGithub size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
