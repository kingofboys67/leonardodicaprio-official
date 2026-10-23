import type { Metadata } from 'next';
import { GalleryPage } from '../../views/GalleryPage';
import { getWebPageSchema, getBreadcrumbSchema, BASE_URL } from '../../utils/schema';

export const metadata: Metadata = {
  title: 'Photo Gallery & Archive | Leonardo DiCaprio',
  description:
    'Exclusive archival photo collection of Leonardo DiCaprio: iconic film stills, red carpet portraits, rare behind-the-scenes moments, and field expeditions.',
  alternates: {
    canonical: '/gallery',
  },
  openGraph: {
    title: 'Photo Gallery & Archive | Leonardo DiCaprio',
    description:
      'Exclusive archival photo collection of Leonardo DiCaprio: iconic film stills, red carpet portraits, rare behind-the-scenes moments, and field expeditions.',
    url: `${BASE_URL}/gallery`,
    siteName: 'Leonardo DiCaprio Official',
    images: [{ url: '/og/leonardo-dicaprio-1200x630.jpg', width: 1200, height: 630, alt: 'Leonardo DiCaprio Photo Gallery' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Photo Gallery & Archive | Leonardo DiCaprio',
    description:
      'Exclusive archival photo collection of Leonardo DiCaprio: iconic film stills, red carpet portraits, rare behind-the-scenes moments, and field expeditions.',
    images: ['/og/leonardo-dicaprio-1200x630.jpg'],
  },
};

export default function GalleryRoute() {
  const pageSchema = getWebPageSchema({
    path: '/gallery',
    name: 'Photo Gallery & Archive | Leonardo DiCaprio',
    description:
      'Exclusive archival photo collection of Leonardo DiCaprio: iconic film stills, red carpet portraits, rare behind-the-scenes moments, and field expeditions.',
    type: 'ImageGallery',
    image: '/og/leonardo-dicaprio-1200x630.jpg',
  });
  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: 'Photo Gallery', path: '/gallery' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([pageSchema, breadcrumbsSchema]),
        }}
      />
      <GalleryPage />
    </>
  );
}
