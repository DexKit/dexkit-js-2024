import type { Metadata } from "next";
import "./globals.css";
import { sora } from './fonts';
import ClientLayout from './layout-client';

export const metadata: Metadata = {
  title: "DexKit - Making Web3 Accessible | No-Code DApp Builder",
  description: "DexKit provides no-code/low-code tools for creating decentralized applications (DApps) in the Web3 space. Build your own branded DApps easily and efficiently.",
  keywords: "DexKit, DApps, Web3, Blockchain, No-Code, Low-Code, Decentralized Finance, DeFi, Ethereum, Polygon, Arbitrum, NFT Marketplace",
  openGraph: {
    title: "DexKit - Making Web3 Accessible",
    description: "Create your own branded DApps with DexKit's no-code/low-code tools.",
    images: [{ url: "/imgs/dexkit_og.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DexKit - Making Web3 Accessible",
    description: "Create your own branded DApps with DexKit's no-code/low-code tools.",
    images: ["/imgs/dexkit_og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${sora.variable}`}>
      <body className={sora.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}