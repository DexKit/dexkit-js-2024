import { locales } from '../i18n/config';

export default function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <div lang={locale}>
      {children}
    </div>
  );
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}