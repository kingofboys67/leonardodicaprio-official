import type { Metadata } from 'next';
import { FilmographyPage } from '../../views/FilmographyPage';
import { getWebPageSchema, getBreadcrumbSchema, BASE_URL } from '../../utils/schema';

export const metadata: Metadata = {
  title: 'Complete Filmography | Leonardo DiCaprio',
  description:
    'Complete catalog of Leonardo DiCaprio filmography: 38+ feature films, television roles, documentaries, synopsis, cast details, and official trailers.',
  alternates: {
    canonical: '/filmography',
  },
  openGraph: {
    title: 'Complete Filmography | Leonardo DiCaprio',
    description:
      'Complete catalog of Leonardo DiCaprio filmography: 38+ feature films, television roles, documentaries, synopsis, cast details, and official trailers.',
    url: `${BASE_URL}/filmography`,
    siteName: 'Leonardo DiCaprio Official',
    images: [{ url: '/og/leonardo-dicaprio-1200x630.jpg', width: 1200, height: 630, alt: 'Leonardo DiCaprio Filmography' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Complete Filmography | Leonardo DiCaprio',
    description:
      'Complete catalog of Leonardo DiCaprio filmography: 38+ feature films, television roles, documentaries, synopsis, cast details, and official trailers.',
    images: ['/og/leonardo-dicaprio-1200x630.jpg'],
  },
};

export default function FilmographyRoute() {
  const pageSchema = getWebPageSchema({
    path: '/filmography',
    name: 'Complete Filmography | Leonardo DiCaprio',
    description:
      'Complete catalog of Leonardo DiCaprio filmography: 38+ feature films, television roles, documentaries, synopsis, cast details, and official trailers.',
    type: 'CollectionPage',
    image: '/og/leonardo-dicaprio-1200x630.jpg',
  });
  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: 'Filmography', path: '/filmography' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([pageSchema, breadcrumbsSchema]),
        }}
      />
      <FilmographyPage />
    </>
  );
}
