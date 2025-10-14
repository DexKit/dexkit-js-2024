import "./globals.css";
import { sora } from './fonts';
import ClientLayout from './layout-client';
import { generateMetadata as generateMetadataBase } from './metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale?: string }> }) {
  const resolvedParams = await params;
  return generateMetadataBase({ params: { locale: resolvedParams.locale || 'en' } });
}

export default async function RootLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ locale?: string }>;
  }
) {
  const params = await props.params;
  const locale = params.locale || 'en';

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
