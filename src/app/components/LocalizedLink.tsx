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

  const localizedHref = locales.includes(currentLocale)
    ? `/${currentLocale}${href}`
    : href;

  return (
    <Link href={localizedHref} {...props}>
      {children}
    </Link>
  );
};

export default LocalizedLink;