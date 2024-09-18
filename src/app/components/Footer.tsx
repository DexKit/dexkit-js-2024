'use client';

import Image from 'next/image'
import LocalizedLink from './LocalizedLink'
import { useState, useEffect, FormEvent } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

export default function Footer() {
  const intl = useIntl();
  const [isMobile, setIsMobile] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const socialNetworks = [
    { name: 'Discord', icon: 'fa-brands fa-discord', url: 'https://discord.com/invite/dexkit-official-943552525217435649' },
    { name: 'YouTube', icon: 'fa-brands fa-youtube', url: 'https://www.youtube.com/@DexKit' },
    { name: 'Twitter', icon: 'fa-brands fa-twitter', url: 'https://twitter.com/dexkit' },
    { name: 'Telegram', icon: 'fa-brands fa-telegram', url: 'https://t.me/dexkit' },
    { name: 'LinkedIn', icon: 'fa-brands fa-linkedin', url: 'https://www.linkedin.com/company/dexkit' },
    { name: 'Reddit', icon: 'fa-brands fa-reddit', url: 'https://www.reddit.com/r/dexkit' },
    { name: 'Medium', icon: 'fa-brands fa-medium', url: 'https://dexkit.medium.com/' },
    { name: 'Instagram', icon: 'fa-brands fa-instagram', url: 'https://www.instagram.com/dexkit.io' },
    { name: 'Facebook', icon: 'fa-brands fa-facebook', url: 'https://www.facebook.com/dexkit.io' },
  ]

  const linkProps = {
    target: "_blank",
    rel: "noopener noreferrer",
    className: "text-white hover:text-orange-400 transition duration-300"
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setMessage(intl.formatMessage({ id: 'footer.newsletter.emailRequired' }));
      return;
    }

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage(intl.formatMessage({ id: 'footer.newsletter.success' }));
        setEmail('');
      } else {
        setMessage(intl.formatMessage({ id: 'footer.newsletter.error' }));
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      setMessage(intl.formatMessage({ id: 'footer.newsletter.error' }));
    }
  };

  return (
    <footer className="py-8 md:py-16 w-full text-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
          <div className="text-center md:text-left md:w-1/4">
            <LocalizedLink href="/">
              <div style={{ width: isMobile ? '150px' : '200px', height: isMobile ? '57px' : '76px' }}>
                <Image 
                  src="/imgs/dexkit-logo-white.svg" 
                  alt="DexKit Logo" 
                  width={200}
                  height={76}
                  style={{ 
                    width: '100%', 
                    height: 'auto', 
                    maxWidth: isMobile ? '150px' : '200px', 
                    maxHeight: isMobile ? '57px' : '76px',
                    objectFit: 'contain' 
                  }}
                />
              </div>
            </LocalizedLink>
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl md:text-4xl font-semibold mb-4 text-center md:text-left">
              <FormattedMessage id="footer.newsletter.title" />
            </h3>
            <p className="mb-4 text-center md:text-left">
              <FormattedMessage id="footer.newsletter.description" />
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="flex">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={intl.formatMessage({ id: 'footer.newsletter.placeholder' })}
                  className="flex-grow p-2 rounded-l-md bg-transparent border border-gray-400 text-white placeholder-gray-400"
                />
                <button type="submit" className="bg-orange-400 text-white p-2 rounded-r-md hover:bg-orange-500 transition duration-300">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
              {message && <p className="mt-2 text-sm text-center md:text-left">{message}</p>}
            </form>
          </div>
        </div>
        <div className="flex justify-center md:justify-start space-x-4 md:space-x-6 mt-8">
          {socialNetworks.map((social) => (
            <LocalizedLink 
              key={social.name} 
              href={social.url} 
              {...linkProps}
            >
              <span className="sr-only">{social.name}</span>
              <i className={`${social.icon} text-xl md:text-2xl`}></i>
            </LocalizedLink>
          ))}
        </div>
      </div>
    </footer>
  )
}