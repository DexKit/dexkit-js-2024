import "./globals.css";
import type { Metadata } from "next";
import { sora } from './fonts';
import ClientLayout from './layout-client';
import { generateMetadata as generateMetadataBase } from './metadata';

export async function generateMetadata({
  params,
}: {
  params?: Promise<{ locale?: string }>;
}): Promise<Metadata> {
  const resolvedParams = params ? await params : {};
  const locale = resolvedParams?.locale || 'en';
  return generateMetadataBase({ params: { locale } });
}

export default async function RootLayout(
  props: {
    children: React.ReactNode;
    params?: Promise<{ locale?: string }>;
  }
) {
  const params = props.params ? await props.params : {};
  const locale = params?.locale || 'en';

  const {
    children
  } = props;

  return (
    <html className={sora.variable} lang={locale}>
      <body className={sora.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
