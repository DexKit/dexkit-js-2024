'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { defaultLocale, locales, Locale } from '../i18n/config';

interface LocalizedLinkProps extends Omit<LinkProps, 'href'> {
  href: string;
  children: React.ReactNode;
  className?: string;
  role?: string;
  onClick?: () => void;
}

const LocalizedLink: React.FC<LocalizedLinkProps> = ({ href, children, className, role, onClick, ...props }) => {
  const pathname = usePathname();
  
  const pathParts = pathname.split('/').filter(Boolean);
  const currentLocale = locales.includes(pathParts[0] as Locale) ? pathParts[0] as Locale : defaultLocale;
  
  let localizedHref = href;
  if (href.startsWith('/') && currentLocale !== defaultLocale) {
    localizedHref = `/${currentLocale}${href}`;
  }

  return (
    <Link href={localizedHref} className={className} role={role} onClick={onClick} {...props}>
      {children}
    </Link>
  );
};

export default LocalizedLink;