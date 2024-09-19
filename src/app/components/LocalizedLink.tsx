import Link, { LinkProps } from 'next/link';
import { useParams } from 'next/navigation';

interface LocalizedLinkProps extends Omit<LinkProps, 'href'> {
  href: string;
  children: React.ReactNode;
  className?: string;
  role?: string;
  onClick?: () => void;
}

const LocalizedLink: React.FC<LocalizedLinkProps> = ({ href, children, className, role, onClick, ...props }) => {
  const { locale } = useParams();

  const localizedHref = href.startsWith('/') ? `/${locale}${href}` : href;

  return (
    <Link href={localizedHref} className={className} role={role} onClick={onClick} {...props}>
      {children}
    </Link>
  );
};

export default LocalizedLink;