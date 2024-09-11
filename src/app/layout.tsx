import type { Metadata } from "next";
import "./globals.css";
import { sora } from './fonts';
import ThemeWrapper from './components/ThemeWrapper';
import Header from './components/Header';
import Footer from './components/Footer';
import Script from 'next/script';

export const metadata: Metadata = {
  title: "DexKit - Making Web3 Accessible",
  description: "DexKit provides no-code/low-code tools for creating decentralized applications (DApps) in the Web3 space.",
  keywords: "DexKit, DApps, Web3, Blockchain, No-Code, Low-Code, Decentralized Finance, DeFi",
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