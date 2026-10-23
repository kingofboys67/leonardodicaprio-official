import type { Metadata } from 'next';
import { ReelsPage } from '../../views/ReelsPage';
import { ALL_REELS } from '../../data/content';
import { getVideoSchema, getWebPageSchema, getBreadcrumbSchema, BASE_URL } from '../../utils/schema';

export const metadata: Metadata = {
  title: 'Historic Video Reels | Leonardo DiCaprio',
  description:
    'Watch historic video reels of Leonardo DiCaprio: Academy Award acceptance speeches, Cannes red carpet moments, and behind-the-scenes cinema clips.',
  alternates: {
    canonical: '/reels',
  },
  openGraph: {
    title: 'Historic Video Reels | Leonardo DiCaprio',
    description:
      'Watch historic video reels of Leonardo DiCaprio: Academy Award acceptance speeches, Cannes red carpet moments, and behind-the-scenes cinema clips.',
    url: `${BASE_URL}/reels`,
    siteName: 'Leonardo DiCaprio Official',
    images: [{ url: '/og/leonardo-dicaprio-1200x630.jpg', width: 1200, height: 630, alt: 'Leonardo DiCaprio Video Reels' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Historic Video Reels | Leonardo DiCaprio',
    description:
      'Watch historic video reels of Leonardo DiCaprio: Academy Award acceptance speeches, Cannes red carpet moments, and behind-the-scenes cinema clips.',
    images: ['/og/leonardo-dicaprio-1200x630.jpg'],
  },
};

export default function ReelsRoute() {
  const pageSchema = getWebPageSchema({
    path: '/reels',
    name: 'Historic Video Reels | Leonardo DiCaprio',
    description:
      'Watch historic video reels of Leonardo DiCaprio: Academy Award acceptance speeches, Cannes red carpet moments, and behind-the-scenes cinema clips.',
    type: 'VideoGallery',
    image: '/og/leonardo-dicaprio-1200x630.jpg',
  });
  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: 'Video Reels', path: '/reels' },
  ]);

  const videoSchemas = ALL_REELS.slice(0, 15).map((reel) =>
    getVideoSchema({
      name: reel.title,
      description: reel.caption,
      thumbnailUrl: reel.thumbnail || `${BASE_URL}/photos/leo_hero.jpg`,
      uploadDate: '2024-01-01T00:00:00Z',
      duration: reel.duration ? `PT${reel.duration.replace(':', 'M')}S` : 'PT2M',
      contentUrl: reel.youtubeId
        ? `https://www.youtube.com/watch?v=${reel.youtubeId}`
        : `${BASE_URL}${reel.videoSrc}`,
      embedUrl: reel.youtubeId
        ? `https://www.youtube-nocookie.com/embed/${reel.youtubeId}`
        : undefined,
    })
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([pageSchema, breadcrumbsSchema, ...videoSchemas]),
        }}
      />
      <ReelsPage />
    </>
  );
}
