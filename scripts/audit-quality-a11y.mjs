import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const appServerDir = path.join(root, '.next/server/app');

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
console.log(`Auditing accessibility, SEO & performance markers on ${htmlFiles.length} pages...`);

let issues = [];

for (const f of htmlFiles) {
  const rel = path.relative(appServerDir, f);
  const html = fs.readFileSync(f, 'utf-8');

  // Check 1: HTML lang
  if (!html.includes('<html lang="en"')) {
    issues.push(`[${rel}] Missing <html lang="en">`);
  }

  // Check 2: Viewport
  if (!html.includes('name="viewport"')) {
    issues.push(`[${rel}] Missing viewport meta tag`);
  }

  // Check 3: Exactly one H1
  const h1Matches = html.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || [];
  if (h1Matches.length === 0) {
    issues.push(`[${rel}] Missing <h1> heading`);
  } else if (h1Matches.length > 1) {
    issues.push(`[${rel}] Multiple (${h1Matches.length}) <h1> headings found`);
  }

  // Check 4: Images have alt attributes
  const imgMatches = html.match(/<img[^>]*>/gi) || [];
  for (const img of imgMatches) {
    if (!img.includes('alt="') && !img.includes("alt='")) {
      issues.push(`[${rel}] Image missing alt attribute: ${img.slice(0, 80)}`);
    }
  }
}

if (issues.length === 0) {
  console.log(`✓ 100% PASS: All ${htmlFiles.length} pages have valid lang="en", viewport, exactly one <h1>, and alt tags on all images!`);
} else {
  console.error(`Found ${issues.length} issue(s):`);
  issues.forEach(i => console.error(' - ' + i));
  process.exit(1);
}
