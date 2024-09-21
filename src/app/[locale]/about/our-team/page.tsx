import { Metadata } from 'next';
import OurTeamContent from './OurTeamContent';

export const metadata: Metadata = {
  title: 'Our Team | DexKit',
  description: 'Meet the talented individuals behind DexKit, driving innovation in the crypto space.',
};

export default function OurTeamPage() {
  return <OurTeamContent />;
}