import Link, { LinkProps } from 'next/link';
import { useParams } from 'next/navigation';
import { defaultLocale } from '../i18n/config';

interface LocalizedLinkProps extends Omit<LinkProps, 'href'> {
  href: string;
  children: React.ReactNode;
  className?: string;
  role?: string;
  onClick?: () => void;
}

const LocalizedLink: React.FC<LocalizedLinkProps> = ({ href, children, className, role, onClick, ...props }) => {
  const { locale } = useParams();

  const localizedHref = locale && locale !== defaultLocale
    ? (href.startsWith('/') ? `/${locale}${href}` : href)
    : href.replace(`/${defaultLocale}`, '');

  return (
    <Link href={localizedHref} className={className} role={role} onClick={onClick} {...props}>
      {children}
    </Link>
  );
};

export default LocalizedLink;