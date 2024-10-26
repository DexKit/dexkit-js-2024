import { generateMetadata as generateMetadataBase } from '../metadata';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return generateMetadataBase({ params });
}

export default function ServerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}