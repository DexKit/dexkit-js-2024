import "./globals.css";
import { sora } from './fonts';
import ClientLayout from './layout-client';
import { generateMetadata as generateMetadataBase } from './metadata';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return generateMetadataBase({ params });
}

export default async function RootLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
  }
) {
  const params = await props.params;

  const {
    children
  } = props;

  return (
    <html className={`${sora.variable}`} lang={params.locale}>
      <body className={sora.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
