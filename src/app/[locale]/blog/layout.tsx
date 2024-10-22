import { Metadata } from 'next';
import messages from '@/app/i18n/messages';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as keyof typeof messages;
  const localeMessages = messages[locale] || messages.en;

  console.log('Generating metadata for blog');
  console.log('Blog title:', localeMessages['blog.title']);
  
  return {
    title: localeMessages['blog.title'],
    description: localeMessages['blog.description'],
    openGraph: {
      title: localeMessages['blog.title'],
      description: localeMessages['blog.description'],
      images: [{ url: '/imgs/dexkit_og.png' }],
    },
  };
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}