import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, Locale } from '../i18n/config';

interface LocalizedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

const LocalizedLink: React.FC<LocalizedLinkProps> = ({ href, children, ...props }) => {
  const pathname = usePathname();
  const currentLocale = pathname?.split('/')[1] as Locale;

  const isExternalUrl = href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//');

  if (isExternalUrl) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  const localizedHref = locales.includes(currentLocale) && !href.startsWith('/')
    ? `/${currentLocale}${href.startsWith('/') ? '' : '/'}${href}`
    : href;

  return (
    <Link href={localizedHref} {...props}>
      {children}
    </Link>
  );
};

export default LocalizedLink;