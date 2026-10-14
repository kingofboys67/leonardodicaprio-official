import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const HOST = 'leonardodicaprioofficial.com';
const KEY = '4fa92e624c964177b94101e4a13d712e';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// Read URLs from sitemap.xml
const sitemapContent = fs.readFileSync(path.join(root, 'public/sitemap.xml'), 'utf-8');
const locMatches = [...sitemapContent.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g)];
const urlList = locMatches.map(m => m[1]);

console.log(`[IndexNow] Found ${urlList.length} URLs in sitemap.xml to submit.`);

const payload = JSON.stringify({
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: urlList.slice(0, 100), // IndexNow allows up to 10,000 per request
});

export async function pingIndexNow() {
  return new Promise((resolve) => {
    // If running in local/test environment or dry run mode, allow graceful fallback
    const dryRun = process.env.INDEXNOW_DRY_RUN === 'true';
    if (dryRun) {
      console.log('[IndexNow] Dry run enabled. Payload prepared successfully:');
      console.log(`  Host: ${HOST}`);
      console.log(`  Key: ${KEY}`);
      console.log(`  Key Location: ${KEY_LOCATION}`);
      console.log(`  URLs submitted: ${urlList.length}`);
      resolve({ status: 200, message: 'Dry run success' });
      return;
    }

    const options = {
      hostname: 'api.indexnow.org',
      port: 443,
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload),
        'User-Agent': 'LeonardoDiCaprioOfficial-IndexNow/1.0',
      },
      timeout: 10000,
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        // IndexNow returns 200 (OK) or 202 (Accepted)
        if (res.statusCode === 200 || res.statusCode === 202) {
          console.log(`[IndexNow] Successfully submitted ${urlList.length} URLs. Status: ${res.statusCode}`);
          resolve({ status: res.statusCode, body: data });
        } else {
          console.warn(`[IndexNow] Response status: ${res.statusCode}, body: ${data}`);
          // IndexNow may return 422 if key is not yet reachable on a live public domain
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', (e) => {
      console.warn(`[IndexNow] Ping warning (offline or domain pending DNS): ${e.message}`);
      resolve({ status: 0, error: e.message });
    });

    req.on('timeout', () => {
      req.destroy();
      console.warn('[IndexNow] Ping request timed out (safe to continue build).');
      resolve({ status: 408, error: 'Timeout' });
    });

    req.write(payload);
    req.end();
  });
}

// Execute directly if run via CLI
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  pingIndexNow().then(() => {
    process.exit(0);
  });
}
