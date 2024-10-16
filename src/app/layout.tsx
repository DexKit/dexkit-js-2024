import "./globals.css";
import { sora } from './fonts';
import ClientLayout from './layout-client';
import Analytics from './components/Analytics';
import { generateMetadata } from './metadata';

export { generateMetadata };

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html className={`${sora.variable}`} lang={params.locale}>
      <body className={sora.className}>
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
      </body>
    </html>
  );
}
