import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const appServerDir = path.join(root, '.next/server/app');

// Recursively find all .html files in .next/server/app
function findHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      findHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html') && !file.startsWith('_') && !file.includes('500')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = findHtmlFiles(appServerDir);
console.log(`Found ${htmlFiles.length} static HTML pages to audit for Discovery.`);

let totalPassed = 0;
let errors = [];
const seenTitles = new Map();
const seenDescs = new Map();

for (const filePath of htmlFiles) {
  const relPath = path.relative(appServerDir, filePath);
  const html = fs.readFileSync(filePath, 'utf-8');

  // 1. Title
  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  if (!titleMatch) {
    errors.push(`[${relPath}] Missing <title> tag`);
    continue;
  }
  const title = titleMatch[1];
  if (title.length > 60) {
    errors.push(`[${relPath}] Title too long (${title.length} chars > 60): "${title}"`);
  }
  if (seenTitles.has(title)) {
    errors.push(`[${relPath}] Duplicate title "${title}" (already on ${seenTitles.get(title)})`);
  } else {
    seenTitles.set(title, relPath);
  }

  // 2. Meta Description
  const descMatch = html.match(/<meta name="description" content="([^"]*)"/);
  if (!descMatch) {
    errors.push(`[${relPath}] Missing meta description`);
    continue;
  }
  const desc = descMatch[1];
  if (desc.length > 155) {
    errors.push(`[${relPath}] Description too long (${desc.length} chars > 155): "${desc}"`);
  }
  if (seenDescs.has(desc)) {
    // Note: film descriptions are unique, era/award are unique
    errors.push(`[${relPath}] Duplicate description (already on ${seenDescs.get(desc)})`);
  } else {
    seenDescs.set(desc, relPath);
  }

  // 3. Canonical Tag
  const canMatch = html.match(/<link rel="canonical" href="([^"]*)"/);
  if (!canMatch) {
    errors.push(`[${relPath}] Missing canonical tag`);
  } else if (!canMatch[1].startsWith('https://leonardodicaprioofficial.com')) {
    errors.push(`[${relPath}] Canonical tag not fully qualified: "${canMatch[1]}"`);
  }

  // 4. Open Graph tags
  const ogTitle = html.match(/<meta property="og:title" content="([^"]*)"/);
  const ogDesc = html.match(/<meta property="og:description" content="([^"]*)"/);
  const ogImage = html.match(/<meta property="og:image" content="([^"]*)"/);
  const ogUrl = html.match(/<meta property="og:url" content="([^"]*)"/);

  if (!ogTitle) errors.push(`[${relPath}] Missing og:title`);
  if (!ogDesc) errors.push(`[${relPath}] Missing og:description`);
  if (!ogImage) errors.push(`[${relPath}] Missing og:image`);
  if (!ogUrl) errors.push(`[${relPath}] Missing og:url`);

  // 5. Twitter Card
  const twCard = html.match(/<meta name="twitter:card" content="([^"]*)"/);
  if (!twCard) errors.push(`[${relPath}] Missing twitter:card`);

  totalPassed++;
}

console.log('\n--- TASK 5 DISCOVERY AUDIT REPORT ---');
console.log(`Audited ${htmlFiles.length} pages.`);
if (errors.length === 0) {
  console.log(`✓ 100% PASS: All ${totalPassed} pages have unique titles <= 60 chars, unique descriptions <= 155 chars, fully-qualified canonical tags, Open Graph, and Twitter Cards!`);
} else {
  console.error(`✗ FAIL: Found ${errors.length} issue(s):`);
  for (const err of errors) {
    console.error(' - ' + err);
  }
  process.exit(1);
}
