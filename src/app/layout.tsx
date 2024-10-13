import type { Metadata } from "next";
import "./globals.css";
import { sora } from './fonts';
import ClientLayout from './layout-client';
import messages from './i18n/messages';
import Analytics from './components/Analytics';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const localeMessages = messages[params.locale as keyof typeof messages] || messages.en;

  return {
    title: {
      template: '%s | DexKit',
      default: localeMessages['layout.title'],
    },
    description: localeMessages['layout.description'],
    keywords: "DexKit, DApps, Web3, Blockchain, No-Code, Low-Code, Decentralized Finance, DeFi, Ethereum, Polygon, Arbitrum, NFT Marketplace",
    openGraph: {
      title: localeMessages['layout.title'],
      description: localeMessages['layout.description'],
      images: [{ url: "/imgs/dexkit_og.png" }],
      locale: params.locale,
      type: 'website',
    },
    twitter: {
      card: "summary_large_image",
      title: localeMessages['layout.title'],
      description: localeMessages['layout.description'],
      images: ["/imgs/dexkit_og.png"],
    },
    alternates: {
      canonical: `https://dexkit.com/${params.locale}`,
      languages: {
        'en-US': '/en',
        'es-ES': '/es',
        'pt-BR': '/pt',
      },
    },
  };
}

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