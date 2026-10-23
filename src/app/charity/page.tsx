import type { Metadata } from 'next';
import { CharityPage } from '../../views/CharityPage';
import { getWebPageSchema, getBreadcrumbSchema, BASE_URL } from '../../utils/schema';

export const metadata: Metadata = {
  title: 'Re:wild & Conservation | Leonardo DiCaprio',
  description:
    'Leonardo DiCaprio\'s global environmental activism: over $100M in grants, Re:wild partnerships, and frontline biodiversity conservation initiatives.',
  alternates: {
    canonical: '/charity',
  },
  openGraph: {
    title: 'Re:wild & Conservation | Leonardo DiCaprio',
    description:
      'Leonardo DiCaprio\'s global environmental activism: over $100M in grants, Re:wild partnerships, and frontline biodiversity conservation initiatives.',
    url: `${BASE_URL}/charity`,
    siteName: 'Leonardo DiCaprio Official',
    images: [{ url: '/og/leonardo-dicaprio-1200x630.jpg', width: 1200, height: 630, alt: 'Leonardo DiCaprio Conservation' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Re:wild & Conservation | Leonardo DiCaprio',
    description:
      'Leonardo DiCaprio\'s global environmental activism: over $100M in grants, Re:wild partnerships, and frontline biodiversity conservation initiatives.',
    images: ['/og/leonardo-dicaprio-1200x630.jpg'],
  },
};

export default function CharityRoute() {
  const pageSchema = getWebPageSchema({
    path: '/charity',
    name: 'Re:wild & Conservation | Leonardo DiCaprio',
    description:
      "Leonardo DiCaprio's global environmental activism: over $100M in grants, Re:wild partnerships, and frontline biodiversity conservation initiatives.",
    type: 'AboutPage',
    image: '/og/leonardo-dicaprio-1200x630.jpg',
  });
  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: 'Conservation & Charity', path: '/charity' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([pageSchema, breadcrumbsSchema]),
        }}
      />
      <CharityPage />
    </>
  );
}
