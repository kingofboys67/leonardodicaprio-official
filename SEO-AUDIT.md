# SEO Audit & Knowledge Panel Playbook

**Site:** https://leonardodicaprioofficial.com
**Audit date:** 22 October 2026
**Scope:** Full Next.js App Router site (59 indexable URLs), with the root layout, global
structured data, sitemaps, robots, and brand assets as the primary focus.

---

## 1. Results at a glance

| Area | Before | After |
| --- | --- | --- |
| URLs returning 200 | 59/59 | 59/59 |
| Broken internal links | 0 | 0 |
| Canonical tags | Present but overwritten client-side on 7 routes | Server-rendered, one per page |
| Titles / descriptions | Inconsistent brand ("Leo" vs "Leonardo"), some over-length | 59/59 unique, ≤60 chars title, ≤155 chars description |
| JSON-LD blocks on home | 4 (Person/Organization/WebSite duplicated) | 2 (global entities + one page entity) |
| Invalid structured-data values | `datePublished: "12/19/1997 (US)"`, `duration: "3h 14m"` | ISO 8601 (`1997-12-19`, `PT3H14M`) |
| Google site verification | Broken placeholder `content="google-site-verification"` | Tag omitted until a real token is supplied |
| Favicon | Emoji SVG data URI; `/favicon.ico` → **404** | Crawlable ICO + 48/192/512 PNG + Apple touch icon |
| Organization logo | 192×240 email photo (`/assets/email/logo.png`) | 512×512 square brand mark |
| Open Graph image | Declared 1200×630, file was **896×1200** | True 1200×630 JPEG (62 KB) |
| Page types | `ProfilePage` injected on achievements, charity, gallery, reels | Correct `CollectionPage` / `AboutPage` / `ImageGallery` / `VideoGallery` |
| Sitemap / RSS dates | Hard-coded `2026-10-13` | Regenerated from build time |
| Canonical host | `www` not redirected | 301 `www` → apex in `next.config.mjs` |
| `/api/*` indexability | Crawlable if robots.txt ignored | `X-Robots-Tag: noindex, nofollow` |
| Discovery gate (`scripts/verify-task5-discovery.mjs`) | Failed | **✓ 100% PASS (59 pages)** |

Existing Lighthouse baseline (mobile, from `scripts/lh-report-updated.json`):
SEO **100**, Accessibility **96**, Best Practices **96**, Performance **77**
(LCP 6.6 s, CLS 0, TBT 10 ms). Performance is addressed in §4.

Search presence observed on 22 Oct 2026: the domain is indexed (home, filmography, legacy,
achievements, gallery, reels, charity, fan-club and film pages all surface), and it ranks for
*"Leonardo DiCaprio official website"*. That is a positive relevance signal, but it is **not** a
knowledge-panel guarantee — see §5.

---

## 2. Critical issues found and fixed

### 2.1 Invalid Google Search Console verification (`src/app/layout.tsx`)
The metadata emitted:

```html
<meta name="google-site-verification" content="google-site-verification">
```

This is a placeholder, not a token, so **Search Console was never verified**. Verification is the
gate for the knowledge-panel claim flow. The tag is now only rendered when
`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` is set.

**Action required:** add the real token in Vercel → Settings → Environment Variables, then redeploy.
Better still, create a **Domain property** in Search Console and verify with a DNS TXT record
(no code change, and it covers `www` + every subdomain).

### 2.2 No crawlable favicon (`src/app/layout.tsx`, `public/site.webmanifest`)
The icon was an emoji SVG data URI. Google does not index data-URI favicons, and `/favicon.ico`
returned 404. Google uses the favicon in Search results and as the knowledge-panel/site icon.

Generated with `scripts/generate-seo-assets.mjs`:

| File | Size | Purpose |
| --- | --- | --- |
| `/favicon.ico` | 16/32/48 | Browser + Googlebot |
| `/icons/icon-48.png` | 48×48 | Google's preferred minimum |
| `/icons/icon-192.png`, `/icons/icon-512.png` | 192/512 | Manifest / rich entities |
| `/icons/maskable-512.png` | 512×512 | Android maskable safe zone |
| `/icons/apple-touch-icon.png` | 180×180 | iOS |

### 2.3 Organization logo was not a logo (`src/utils/schema.ts`)
`Organization.logo` pointed at `/assets/email/logo.png` — a 192×240 email header image. Google's
logo guidelines require a square-ish raster logo of at least 112×112. It now points at the
512×512 monogram with explicit `width`/`height` in an `ImageObject`.

> Replace the monogram with the real brand mark when one exists. The generator script makes that a
> one-file change.

### 2.4 Client-side `<SEOHead>` was fighting the server (`src/components/SEOHead.tsx`)
A `useEffect` component rewrote `document.title`, description, canonical, OG/Twitter tags **and
injected JSON-LD after hydration** on seven routes. Consequences:

- `/legacy` shipped one title and swapped to another after JS ran.
- `ProfilePage` schema was injected on `/achievements`, `/charity`, `/gallery` and `/reels`.
- Every page that used `<PageBanner>` got a `ProfilePage` + `BreadcrumbList` on top of its
  server-rendered schema.

The component was removed and its callers now rely solely on the Next.js Metadata API and
server-rendered JSON-LD. Each route declares its own accurate page type.

### 2.5 Duplicate global entities on the home page (`src/app/page.tsx`)
`Person`, `Organization` and `WebSite` were emitted in **both** `layout.tsx` and `page.tsx`
(4 JSON-LD blocks). The layout is now the single source of truth; the home page adds only its
`WebPage`.

### 2.6 Open Graph image dimensions did not match the file
`og:image:width/height` claimed 1200×630 while `leo_hero.jpg` is 896×1200 and posters are 533×800.
Social crawlers cropped or rejected the preview. A real 1200×630 card is now generated and used
site-wide; film pages keep their portrait poster inside `Movie.image`, where it belongs.

### 2.7 Structured-data correctness
- `Movie.actor` used `PerformanceRole` instead of a `Person` (Google expects `Person`).
- `Movie.datePublished` was `"12/19/1997 (US)"` → now `1997-12-19`.
- `Movie.duration` was `"3h 14m"` → now `PT3H14M`.
- `Person.image` is now an `ImageObject[]` with dimensions and captions (knowledge-panel images
  need dimensions and crawlable URLs).
- `Organization` gained `description`, `contactPoint`, `alternateName`, and its own square `logo`.
- `Organization.sameAs` no longer points at Leonardo DiCaprio's **personal** social profiles —
  that conflated the brand entity with the person entity. Add the site's own verified profiles
  when they exist.

### 2.8 Sitemap and RSS freshness
`scripts/generate-discovery.mjs` hard-coded `TODAY = '2026-10-13'`, so every deploy claimed the
same `<lastmod>`. It now uses the build date; `feed.xml`'s `<lastBuildDate>` is dynamic too.

### 2.9 Host canonicalisation
`next.config.mjs` now 301-redirects `www.leonardodicaprioofficial.com/*` to
`https://leonardodicaprioofficial.com/*`, preventing duplicate-host indexing. Attach the `www`
domain in Vercel for the redirect to fire.

### 2.10 Misc
- `/api/*` responses send `X-Robots-Tag: noindex, nofollow`.
- `/photos/*` and `/assets/*` get a 1-day cache with a 7-day stale-while-revalidate window.
- `poweredByHeader` disabled.
- `viewport` / `themeColor` exported from the layout instead of being implicit.
- Era/award title and description truncation fixed (the old logic cut titles at 25 characters and
  produced descriptions as short as 61 characters).
- Brand naming standardised to **Leonardo DiCaprio** in titles (no more `| Leo`).


---

## 3. Verification performed after the changes

| Check | Command | Result |
| --- | --- | --- |
| TypeScript | `npx tsc --noEmit` | Clean |
| Production build | `npm run build` | Success, 59 prerendered routes |
| Crawl + link check | `node scripts/final-audit.mjs` (against `npm start`) | 59/59 HTTP 200, 110 internal links, **0 broken**, 0 invalid schema |
| Discovery gate | `node scripts/verify-task5-discovery.mjs` | **100% pass** — unique titles ≤60, descriptions ≤155, absolute canonicals, OG + Twitter on every page |
| Head inspection | built `.next/server/app/**/*.html` | One canonical, `og:image` 1200×630, crawlable icon set, no placeholder verification |
| Asset serving | `curl localhost:3000/favicon.ico`, `/icons/icon-512.png`, `/og/…jpg` | 200 / 200 / 200 |

Structured data now emitted:

- **All pages:** `Person`, `Organization`, `WebSite` (once, from the root layout).
- **Home:** `WebPage`.
- **/legacy:** `ProfilePage` (+ nested `BreadcrumbList`) + `FAQPage`.
- **/filmography, /achievements:** `CollectionPage` + `BreadcrumbList`.
- **/gallery:** `ImageGallery`; **/reels:** `VideoGallery` + up to 15 `VideoObject`s.
- **/charity:** `AboutPage`; **/fan-club:** `WebPage`.
- **Detail pages:** `ItemPage` + `Movie` / `BreadcrumbList`.

---

## 4. What is still open (and who has to do it)

| # | Item | Impact | Effort | Owner |
| --- | --- | --- | --- | --- |
| 1 | Verify the domain in Google Search Console (DNS TXT, Domain property) | **Critical** — gates the claim flow and all indexing data | 10 min | Site owner |
| 2 | Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (optional URL-prefix verification) | High | 2 min | Site owner |
| 3 | Deploy this build, then request indexing for the 10 core URLs | High | 15 min | Site owner |
| 4 | Retry IndexNow after deploy (currently 403) | Medium | 1 min | Site owner |
| 5 | Add the site to Wikidata `P856` (official website) on Q38170 — **only if authorised** | **Very high** for the panel's official-site link | 10 min | Leo's team / authorised rep |
| 6 | Earn 5–10 independent, editorial mentions/links (press, film, conservation) | High — corroboration is what makes an entity "known" | Weeks | PR |
| 7 | Create the site's own profiles (YouTube/X/Instagram/Facebook) and add them to `Organization.sameAs` | Medium | 1 h | Site owner |
| 8 | Fix LCP (6.6 s mobile) | Medium | 1–2 days | Dev |
| 9 | Replace the monogram with a real brand logo (512×512) | Medium (panel logo eligibility) | Design | Brand |

### 4.1 LCP 6.6 s
The hero image is only 72 KB, so the bottleneck is likely render/asset scheduling rather than
bytes. Recommended, in order:

1. Re-run Lighthouse against the deployed site (the old report was a localhost simulation).
2. Serve the five hero images as AVIF/WebP `<picture>` sources (800 px originals are also soft on
   large screens — regenerate at 1600 px).
3. Remove the unused `preload` hints for below-the-fold portraits that Next injects from raw
   `<img>` tags, or convert those images to `next/image`.
4. Re-measure. Target LCP < 2.5 s, CLS already 0, TBT already 10 ms.

### 4.2 Deprecated rich-result features
- **FAQPage** rich results are limited to authoritative government/health sites since 2023. The
  markup is still valid and useful for AI answer engines, but do not expect FAQ snippets in Google.
- **SearchAction** (sitelinks search box) was retired by Google in 2024. It is harmless and still
  meaningful to other consumers, but it will not produce a search box in Google.
- **HowTo** is deprecated; none is used here.

### 4.3 Content/claim risk
The site presents itself as the official website of Leonardo DiCaprio. If that is not backed by an
authorised relationship, the "official" claim is an impersonation risk: Google can suppress the
entity, and the person's representatives can file takedowns. Nothing in this audit can substitute
for authorisation. See §5.1.

---

## 5. Claiming the knowledge panel

### 5.1 The honest answer first

**A knowledge panel cannot be created or claimed through code, schema, or an API.** Google's own
documentation describes the only mechanism:

> Search for yourself or the entity you represent and find your knowledge panel. At the bottom,
> click **Claim this knowledge panel** … Sign in to one of the official sites or profiles listed:
> YouTube, Search Console, Twitter, Facebook.
> — Google Knowledge Panel Help, *Get verified on Google*

Two consequences for this project:

1. **Leonardo DiCaprio's personal panel already exists and belongs to the person entity.** Google
   builds it from the Knowledge Graph (Wikipedia, Wikidata, IMDb, press). A website cannot claim
   another person's panel. Only Leonardo DiCaprio or an authorised representative can pass the
   verification (his YouTube channel, his X/Facebook account, or a Search Console property he
   controls). Attempting otherwise is impersonation, not SEO.
2. **This site can, at most, earn its own entity** — "Leonardo DiCaprio Official" as a website/brand.
   That requires (a) Search Console ownership, which proves control of the domain, and (b) enough
   independent corroboration for Google to consider the brand noteworthy. Schema helps Google
   understand the entity; it does not make it notable.

There is no legitimate way to shortcut this. "Knowledge panel services" that promise otherwise are
selling fabricated `sameAs` networks or fake Wikipedia pages, and both get entities removed.

### 5.2 What has already been implemented for eligibility

These are the technical preconditions Google and the Knowledge Graph look for. All are now in the
build:

- **Domain control, proven at the DNS level** — the code no longer blocks verification; see below.
- **A single canonical entity graph** with stable `@id` values:
  - `https://leonardodicaprioofficial.com/#person`
  - `https://leonardodicaprioofficial.com/#organization`
  - `https://leonardodicaprioofficial.com/#website`
  - `…/{path}#webpage`
- **`Person` → `sameAs`** to Wikipedia, Wikidata **Q38170**, IMDb, Instagram, X, Facebook. This is
  the strongest on-site signal that the page is about the same entity as the panel.
- **`Organization`** with a 512×512 logo, `ImageObject` dimensions, `contactPoint`, `founder` → the
  Person `@id`, and no misleading `sameAs` to the person's personal profiles.
- **A crawlable favicon and icon set** at stable URLs (Google uses these for the site icon in the
  panel and in Search).
- **Consistent brand naming** ("Leonardo DiCaprio Official") across `<title>`, Open Graph,
  `WebSite.name`, `Organization.name`, the manifest, and `llms.txt`.
- **One canonical host** (`www` → apex 301), one canonical URL per page, absolute canonicals.
- **A real 1200×630 social/OG image** with correct declared dimensions.
- **Accurate page typing** (`ProfilePage` only on `/legacy`, where the biography actually is).
- **Clean crawl surface**: 59/59 URLs 200, 0 broken links, sitemap + RSS + image/video sitemaps,
  IndexNow key file, `llms.txt`.

### 5.3 Exact claim procedure (for the entity's authorised representative)

1. **Verify the domain in Google Search Console.** Prefer a **Domain property**:
   - Add `leonardodicaprioofficial.com` → copy the `google-site-verification=…` TXT value.
   - Add it as a TXT record at the DNS provider, then click Verify.
   - This proves control of every URL and subdomain, and it is what the claim flow checks.
2. *(Optional, if using URL-prefix verification)* set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` to the
   HTML-tag token in Vercel and redeploy. The layout emits the tag only when the variable exists.
3. Deploy this build and confirm these return 200:
   - `https://leonardodicaprioofficial.com/favicon.ico`
   - `https://leonardodicaprioofficial.com/icons/icon-512.png`
   - `https://leonardodicaprioofficial.com/og/leonardo-dicaprio-1200x630.jpg`
   - `https://leonardodicaprioofficial.com/sitemap.xml`
4. Search Google for the entity name while signed in with the account that owns the Search Console
   property. Open the knowledge panel.
5. Click **Claim this knowledge panel** (bottom of the panel, or **Menu** on mobile).
6. Verify by signing in to one of the **official sites/profiles Google lists** — Search Console is
   the one this site can satisfy. If Google cannot identify official sites, it will ask for more
   information.
7. Once verified, manage contributors at
   `https://www.google.com/search/contributions/manage`.
8. Use **Feedback** on individual facts to suggest corrections, with links to primary sources
   (Oscars.org, UN, Re:wild, IMDb, Wikidata).

**Expect this to fail for Leonardo DiCaprio's personal panel** unless the signed-in account is
recognised as his. Google's flow is designed exactly to prevent third parties from taking over a
person's panel, and the error "Someone is already managing the account" means someone legitimate
got there first.



### 5.4 The one external signal that matters most

The **official website link inside a knowledge panel** comes from the Knowledge Graph, and the
single most effective input is **Wikidata `P856` (official website)** on the entity item
(`Q38170` for Leonardo DiCaprio). Google also reads Wikipedia infobox/external links.

- If this site is genuinely the official site, Leo's team (or an authorised rep, declaring the
  conflict of interest per Wikidata policy) should add:
  `P856 → https://leonardodicaprioofficial.com` with a reference.
- If it is not, **do not touch Wikidata**. Unsourced or promotional edits are reverted, and repeated
  attempts get the domain blacklisted from the project — the opposite of the desired outcome.
- A brand-new website does not get its own Wikidata item or panel just because it has schema.
  Notability requires independent coverage (press, film industry, conservation partners), not markup.

### 5.5 Do not do these

- Do not buy "knowledge panel" services, `sameAs` networks, or fake Wikipedia/Wikidata entries.
- Do not add `sameAs` links to profiles the site does not control.
- Do not claim another person's panel, and do not use `Person` markup for someone you do not
  represent.
- Do not keyword-stuff "official" into titles/descriptions; it does not influence panels and it does
  influence manual quality reviews.

---

## 6. Files changed

**New**
- `public/favicon.ico`, `public/icons/*.png`, `public/og/leonardo-dicaprio-1200x630.jpg`
- `scripts/generate-seo-assets.mjs` — regenerates all of the above with `sharp`
- `SEO-AUDIT.md` — this document

**Modified**
- `src/app/layout.tsx` — verification, icons, viewport, OG image, `llms.txt`/sitemap links
- `src/utils/schema.ts` — entity graph, `getWebPageSchema`, ISO date/duration normalisation
- `src/app/page.tsx` and every route under `src/app/**/page.tsx` — one accurate page entity each
- `src/components/PageBanner.tsx`, `src/views/*.tsx` — removed client-side metadata/schema overrides
- `src/components/SEOHead.tsx` — **deleted** (unused after the refactor)
- `next.config.mjs` — `www` 301, API `noindex`, asset caching, `poweredByHeader`
- `public/site.webmanifest`, `public/robots.txt`, `public/sitemap*.xml`, `public/feed.xml`
- `scripts/generate-discovery.mjs` — build-date `lastmod` / `lastBuildDate`
- `package.json`, `package-lock.json` — `sharp` devDependency for the asset generator
- `.gitignore` — `tsconfig.tsbuildinfo`

---

## 7. Reproduce

```bash
# Regenerate icons + OG image (only needed when the brand mark changes)
node scripts/generate-seo-assets.mjs

# Type-check and build (postbuild regenerates sitemaps/feed and pings IndexNow)
npx tsc --noEmit
npm run build

# Crawl the production build
npm start &
node scripts/final-audit.mjs            # 59 URLs, 0 broken links
node scripts/verify-task5-discovery.mjs # titles/descriptions/canonicals/OG gate
```

### Notes
- `IndexNow` returns **403 — UserForbiddedToAccessSite** during local builds. The key file
  (`/4fa92e624c964177b94101e4a13d712e.txt`) is live and byte-identical, so this is a
  domain-verification issue on the IndexNow side; re-run after the next deploy. Builds are not
  blocked by it.
- The old Lighthouse report was generated against `http://localhost:3000/` (mobile simulate), not
  production. Re-baseline after deploy before optimising further.
