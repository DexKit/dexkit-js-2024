import { Metadata } from "next";
import messages from './i18n/messages';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const localeMessages = messages[params.locale as keyof typeof messages] || messages.en;

  const baseUrl = 'https://dexkit.com';
  const ogImageUrl = `${baseUrl}/imgs/dexkit_og.png`;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: '%s | DexKit',
      default: localeMessages['layout.title'],
    },
    description: localeMessages['layout.description'],
    keywords: [
      "DexKit", "DApps", "Web3", "Blockchain", "No-Code", "Low-Code", 
      "Decentralized Finance", "DeFi", "Ethereum", "Polygon", "Arbitrum", 
      "NFT Marketplace", "Crypto", "Cryptocurrency", "Smart Contracts"
    ],
    authors: [{ name: 'DexKit Team' }],
    creator: 'DexKit',
    publisher: 'DexKit',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: localeMessages['layout.title'],
      description: localeMessages['layout.description'],
      url: `${baseUrl}/${params.locale}`,
      siteName: 'DexKit',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: 'DexKit - Web3 DApp Building Platform',
        },
      ],
      locale: params.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: localeMessages['layout.title'],
      description: localeMessages['layout.description'],
      site: '@dexkit',
      creator: '@dexkit',
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `${baseUrl}/${params.locale}`,
      languages: {
        'en-US': '/en',
        'es-ES': '/es',
        'pt-BR': '/pt',
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}