import type { Metadata } from "next";
import "./globals.css";
import { sora } from './fonts';
import ThemeWrapper from './components/ThemeWrapper';
import Header from './components/Header';
import Footer from './components/Footer';
import Script from 'next/script';

export const metadata: Metadata = {
  title: "DexKit - Making Web3 Accessible | No-Code DApp Builder",
  description: "DexKit provides no-code/low-code tools for creating decentralized applications (DApps) in the Web3 space. Build your own branded DApps easily and efficiently.",
  keywords: "DexKit, DApps, Web3, Blockchain, No-Code, Low-Code, Decentralized Finance, DeFi, Ethereum, Polygon, Arbitrum, NFT Marketplace",
  openGraph: {
    title: "DexKit - Making Web3 Accessible",
    description: "Create your own branded DApps with DexKit's no-code/low-code tools.",
    images: [{ url: "/imgs/dexkit-og.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DexKit - Making Web3 Accessible",
    description: "Create your own branded DApps with DexKit's no-code/low-code tools.",
    images: ["/imgs/dexkit-og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sora.variable}`}>
      <head>
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/js/all.min.js"
          strategy="lazyOnload"
        />
        <Script id="schema-markup" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "DexKit",
              "applicationCategory": "DevelopmentTool",
              "operatingSystem": "Web",
              "description": "No-code/low-code tools for creating decentralized applications (DApps) in the Web3 space.",
              }
            }
          `}
        </Script>
      </head>
      <body className={sora.className}>
        <ThemeWrapper>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeWrapper>
      </body>
    </html>
  );
}