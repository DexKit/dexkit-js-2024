import { Metadata } from 'next';
import { locales } from '../i18n/config';
import { generateMetadata as generateMetadataBase } from '../metadata';
import LocaleLayoutClient from './LocaleLayoutClient';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateMetadataBase({ params: { locale } });
}

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LocaleLayoutClient>{children}</LocaleLayoutClient>;
}
