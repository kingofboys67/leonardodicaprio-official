import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const BASE_URL = 'http://localhost:3000';

function fetchPage(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(`${BASE_URL}${urlPath}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    }).on('error', reject);
  });
}

// Read URLs from public/sitemap.xml
const sitemap = fs.readFileSync(path.join(root, 'public/sitemap.xml'), 'utf-8');
const urls = [...sitemap.matchAll(/<loc>https:\/\/leonardodicaprioofficial\.com([^<]*)<\/loc>/g)].map(m => m[1] || '/');

console.log(`Starting Comprehensive Final Audit on ${urls.length} URLs...`);

const auditResults = [];
const allDiscoveredLinks = new Set();
const brokenLinks = [];

// Helper to validate JSON-LD
function validateJsonLd(schemas, urlPath) {
  const issues = [];
  const typesPresent = [];

  function checkEntity(item) {
    if (!item) return;
    if (Array.isArray(item)) {
      item.forEach(checkEntity);
      return;
    }
    if (item['@type']) {
      const type = Array.isArray(item['@type']) ? item['@type'].join('+') : item['@type'];
      typesPresent.push(type);
    }
    if (item['@type'] === 'ProfilePage' && !item.mainEntity) {
      issues.push('ProfilePage missing mainEntity');
    }
    if (item['@type'] === 'Movie') {
      if (!item.name) issues.push('Movie missing name');
      if (!item.director) issues.push('Movie missing director');
    }
    if (item['@type'] === 'VideoObject') {
      if (!item.name) issues.push('VideoObject missing name');
      if (!item.thumbnailUrl) issues.push('VideoObject missing thumbnailUrl');
    }
    if (item['@type'] === 'FAQPage' && (!item.mainEntity || item.mainEntity.length === 0)) {
      issues.push('FAQPage has empty mainEntity');
    }
    if (item['@type'] === 'BreadcrumbList' && (!item.itemListElement || item.itemListElement.length === 0)) {
      issues.push('BreadcrumbList has empty itemListElement');
    }
    // Check nested
    if (item.mainEntity) checkEntity(item.mainEntity);
    if (item.potentialAction) checkEntity(item.potentialAction);
    if (item.video) checkEntity(item.video);
  }

  schemas.forEach(checkEntity);
  return {
    types: Array.from(new Set(typesPresent)),
    isValid: issues.length === 0,
    issues
  };
}

async function runAudit() {
  for (const urlPath of urls) {
    try {
      const { statusCode, body } = await fetchPage(urlPath);
      if (statusCode !== 200) {
        brokenLinks.push({ urlPath, statusCode });
        continue;
      }

      // Title
      const titleMatch = body.match(/<title>([^<]*)<\/title>/);
      const title = titleMatch ? titleMatch[1] : '';

      // Meta Description
      const descMatch = body.match(/<meta name="description" content="([^"]*)"/);
      const desc = descMatch ? descMatch[1] : '';

      // Canonical
      const canMatch = body.match(/<link rel="canonical" href="([^"]*)"/);
      const canonical = canMatch ? canMatch[1] : '';

      // Raw text check (headings, paragraphs, body text rendered without JS)
      const hasH1 = /<h1[^>]*>[\s\S]*?<\/h1>/i.test(body);
      const hasMain = /<main[^>]*>[\s\S]*?<\/main>/i.test(body);
      const hasTextContent = body.includes('Leonardo DiCaprio') || body.includes('DiCaprio');
      const rawTextVisible = hasH1 && hasMain && hasTextContent;

      // Extract JSON-LD
      const schemaMatches = [...body.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
      const parsedSchemas = [];
      for (const m of schemaMatches) {
        try {
          const parsed = JSON.parse(m[1]);
          if (Array.isArray(parsed)) parsedSchemas.push(...parsed);
          else parsedSchemas.push(parsed);
        } catch (e) {}
      }

      const schemaValidation = validateJsonLd(parsedSchemas, urlPath);

      // Collect internal links to test
      const linkMatches = [...body.matchAll(/href="(\/[^"#?]*)/gi)];
      for (const lm of linkMatches) {
        if (!lm[1].startsWith('/_next') && !lm[1].startsWith('/api')) {
          allDiscoveredLinks.add(lm[1]);
        }
      }

      auditResults.push({
        url: urlPath,
        canonical,
        statusCode,
        title,
        titleLen: title.length,
        desc,
        descLen: desc.length,
        schemaTypes: schemaValidation.types.join(', '),
        schemaValid: schemaValidation.isValid ? 'Valid (0 errors)' : `Invalid (${schemaValidation.issues.join(', ')})`,
        rawTextVisible: rawTextVisible ? 'YES' : 'NO',
      });
    } catch (err) {
      brokenLinks.push({ urlPath, error: err.message });
    }
  }

  // Verify all discovered internal links
  console.log(`Checking ${allDiscoveredLinks.size} discovered internal links for broken paths...`);
  for (const link of allDiscoveredLinks) {
    try {
      const res = await fetchPage(link);
      if (res.statusCode === 404 || res.statusCode === 500) {
        brokenLinks.push({ link, statusCode: res.statusCode });
      }
    } catch (e) {
      brokenLinks.push({ link, error: e.message });
    }
  }

  // Save audit results
  fs.writeFileSync(
    path.join(root, 'scripts/audit-report.json'),
    JSON.stringify({ auditResults, brokenLinks }, null, 2)
  );

  console.log('✓ Comprehensive audit complete!');
  console.log(`Total URLs Audited: ${auditResults.length}`);
  console.log(`Broken Links: ${brokenLinks.length}`);
}

runAudit();
