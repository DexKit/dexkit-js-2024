import type { Metadata } from "next";
import "./globals.css";
import { sora } from './fonts';
import ThemeWrapper from './components/ThemeWrapper';

export const metadata: Metadata = {
  title: "DexKit - Create Your Own Branded DApps",
  description: "DexKit provides no-code/low-code tools for creating decentralized applications (DApps) in the Web3 space.",
  keywords: "DexKit, DApps, Web3, Blockchain, No-Code, Low-Code, Decentralized Finance, DeFi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sora.variable}>
      <ThemeWrapper>
        {children}
      </ThemeWrapper>
    </html>
  );
}