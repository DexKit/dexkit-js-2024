'use client';

import Image from 'next/image'
import LocalizedLink from './LocalizedLink'
import { useState, useEffect, FormEvent } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord, faYoutube, faXTwitter, faTelegram, faLinkedin, faReddit, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons'
import confetti from 'canvas-confetti'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function Footer() {
  const intl = useIntl();
  const [isMobile, setIsMobile] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { locale } = useParams();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const socialNetworks = [
    { name: 'Discord', icon: faDiscord, url: 'https://discord.com/invite/dexkit-official-943552525217435649' },
    { name: 'YouTube', icon: faYoutube, url: 'https://www.youtube.com/@DexKit' },
    { name: 'X', icon: faXTwitter, url: 'https://x.com/intent/follow?screen_name=dexkit' },
    { name: 'Telegram', icon: faTelegram, url: 'https://t.me/dexkit' },
    { name: 'LinkedIn', icon: faLinkedin, url: 'https://www.linkedin.com/company/dexkit' },
    { name: 'Reddit', icon: faReddit, url: 'https://www.reddit.com/r/dexkit' },
    { name: 'Instagram', icon: faInstagram, url: 'https://www.instagram.com/dexkit.io' },
    { name: 'Facebook', icon: faFacebook, url: 'https://www.facebook.com/dexkit.io' },
  ]

  const linkProps = {
    target: "_blank",
    rel: "noopener noreferrer",
    className: "text-white hover:text-orange-400 transition duration-300"
  };

  const triggerConfetti = (buttonElement: HTMLButtonElement) => {
    const rect = buttonElement.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x, y },
      colors: ['#FF9843', '#FFC93C', '#FF5733', '#C70039', '#900C3F'],
      angle: 90,
      startVelocity: 30,
      gravity: 0.9,
      ticks: 200,
      shapes: ['circle', 'square'],
      zIndex: 9999
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setMessage(intl.formatMessage({ id: 'footer.newsletter.invalidEmail' }));
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          locale: intl.locale,
          subscriptionDate: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(intl.formatMessage({ id: data.messageId }));
      } else {
        setMessage(intl.formatMessage({ id: 'newsletter.success' }));
        setEmail('');
        const buttonElement = document.querySelector('button[type="submit"]') as HTMLButtonElement;
        if (buttonElement) {
          triggerConfetti(buttonElement);
        }
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      setMessage(intl.formatMessage({ id: 'newsletter.error.internal' }));
    } finally {
      setIsLoading(false);
    }
  };

  // Construir la ruta de términos basada en el locale
  const termsPath = locale ? `/${locale}/terms` : '/terms';

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
            <h3 className="text-xl sm:text-2xl md:text-4xl font-semibold mb-4 text-center md:text-left">
              <FormattedMessage id="footer.newsletter.title" />
            </h3>
            <p className="mb-4 text-sm sm:text-base md:text-lg text-center md:text-left">
              <FormattedMessage id="footer.newsletter.description" />
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="flex">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={intl.formatMessage({ id: 'newsletter.placeholder' })}
                  disabled={isLoading}
                  className={`flex-grow p-2 rounded-l-md bg-transparent border border-gray-400 text-white placeholder-gray-400 text-sm sm:text-base ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className={`flex items-center justify-center space-x-2 bg-orange-400 text-black p-2 rounded-r-md hover:bg-orange-500 transition duration-300 text-sm sm:text-base ${isLoading ? 'opacity-50 cursor-not-allowed bg-gray-400' : ''}`}
                  aria-label={intl.formatMessage({ id: 'footer.subscribe.button' })}
                >
                  <span>
                    {isLoading 
                      ? intl.formatMessage({ id: 'newsletter.button.loading' })
                      : intl.formatMessage({ id: 'newsletter.button' })}
                  </span>
                  <i className={`fas fa-paper-plane ${isLoading ? 'opacity-50' : ''}`} />
                </button>
              </div>
              {message && (
                <p className={`mt-2 text-sm text-center md:text-left ${
                  message === intl.formatMessage({ id: 'newsletter.success' })
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}>
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-8">
          <div className="flex space-x-4 md:space-x-6">
            {socialNetworks.map((social) => (
              <LocalizedLink 
                key={social.name} 
                href={social.url} 
                {...linkProps}
              >
                <span className="sr-only">{social.name}</span>
                <FontAwesomeIcon icon={social.icon} className="text-xl md:text-2xl" />
              </LocalizedLink>
            ))}
          </div>
          
          <Link 
            href={termsPath} 
            className="hidden md:block text-sm sm:text-base text-gray-400 hover:text-orange-400 transition-colors duration-200"
          >
            <FormattedMessage id="footer.legal.terms" />
          </Link>

          <Link 
            href={termsPath} 
            className="md:hidden text-sm sm:text-base text-gray-400 hover:text-orange-400 transition-colors duration-200 mt-4"
          >
            <FormattedMessage id="footer.legal.terms" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
