import { generateMetadata as generateMetadataBase } from '../metadata';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return generateMetadataBase({ params });
}