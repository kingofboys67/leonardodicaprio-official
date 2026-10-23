/**
 * Generates the crawlable brand assets used by search engines and social platforms:
 *   - public/favicon.ico            (16/32/48 px, PNG-compressed ICO)
 *   - public/icons/*.png
 *   - public/og/leonardo-dicaprio-1200x630.jpg
 *
 * Run with: node scripts/generate-seo-assets.mjs
 * (sharp is provided by Next.js and is listed in devDependencies for this script.)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
const iconsDir = path.join(publicDir, 'icons');
const ogDir = path.join(publicDir, 'og');

fs.mkdirSync(iconsDir, { recursive: true });
fs.mkdirSync(ogDir, { recursive: true });

const BRAND_BG = '#0c101c';
const BRAND_GOLD = '#f28c28';

/** Square brand mark. `padding` keeps the glyph inside the maskable safe zone. */
function logoSvg(size, padding = 0) {
  const inset = Math.round(size * (0.06 + padding));
  const radius = Math.round(size * 0.19);
  const fontSize = Math.round(size * 0.44);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <defs>
      <radialGradient id="bg" cx="30%" cy="20%" r="90%">
        <stop offset="0%" stop-color="#16203a"/>
        <stop offset="100%" stop-color="${BRAND_BG}"/>
      </radialGradient>
    </defs>
    <rect width="${size}" height="${size}" fill="url(#bg)"/>
    <rect x="${inset}" y="${inset}" width="${size - inset * 2}" height="${size - inset * 2}"
      rx="${radius}" fill="none" stroke="${BRAND_GOLD}" stroke-width="${Math.max(2, Math.round(size * 0.018))}"/>
    <text x="50%" y="${Math.round(size * 0.655)}" text-anchor="middle"
      font-family="Georgia, 'Times New Roman', serif" font-weight="bold"
      font-size="${fontSize}" letter-spacing="${Math.round(size * 0.01)}" fill="${BRAND_GOLD}">LD</text>
  </svg>`;
}

async function writePng(size, file, padding = 0) {
  await sharp(Buffer.from(logoSvg(size, padding)))
    .png({ compressionLevel: 9 })
    .toFile(path.join(iconsDir, file));
}

const sizes = [
  [16, 'icon-16.png', 0],
  [32, 'icon-32.png', 0],
  [48, 'icon-48.png', 0],
  [180, 'apple-touch-icon.png', 0],
  [192, 'icon-192.png', 0],
  [512, 'icon-512.png', 0],
  [512, 'maskable-512.png', 0.08],
];

for (const [size, file, padding] of sizes) {
  await writePng(size, file, padding);
}

// ICO container with PNG-compressed 16/32/48 px entries (supported by Googlebot and browsers).
const icoEntries = [];
for (const size of [16, 32, 48]) {
  const buffer = await sharp(Buffer.from(logoSvg(size))).png({ compressionLevel: 9 }).toBuffer();
  icoEntries.push({ size, buffer });
}

const icoHeader = Buffer.alloc(6);
icoHeader.writeUInt16LE(0, 0); // reserved
icoHeader.writeUInt16LE(1, 2); // type: icon
icoHeader.writeUInt16LE(icoEntries.length, 4);

let offset = 6 + icoEntries.length * 16;
const directory = [];
for (const entry of icoEntries) {
  const item = Buffer.alloc(16);
  item.writeUInt8(entry.size >= 256 ? 0 : entry.size, 0); // width
  item.writeUInt8(entry.size >= 256 ? 0 : entry.size, 1); // height
  item.writeUInt8(0, 2); // palette
  item.writeUInt8(0, 3); // reserved
  item.writeUInt16LE(1, 4); // colour planes
  item.writeUInt16LE(32, 6); // bits per pixel
  item.writeUInt32LE(entry.buffer.length, 8);
  item.writeUInt32LE(offset, 12);
  offset += entry.buffer.length;
  directory.push(item);
}

fs.writeFileSync(
  path.join(publicDir, 'favicon.ico'),
  Buffer.concat([icoHeader, ...directory, ...icoEntries.map((e) => e.buffer)])
);

// 1200x630 Open Graph / Twitter card image (matches the dimensions declared in metadata).
const photoWidth = 470;
const photo = await sharp(path.join(publicDir, 'photos/leo_hero.jpg'))
  .resize({ height: 630, width: photoWidth, fit: 'cover', position: 'top' })
  .modulate({ brightness: 0.92 })
  .toBuffer();

const overlaySvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${BRAND_BG}" stop-opacity="1"/>
      <stop offset="55%" stop-color="${BRAND_BG}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="${BRAND_BG}" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="glow" cx="18%" cy="18%" r="60%">
      <stop offset="0%" stop-color="${BRAND_GOLD}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${BRAND_GOLD}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="690" y="0" width="250" height="630" fill="url(#fade)"/>
  <rect x="2" y="2" width="1196" height="626" fill="none" stroke="${BRAND_GOLD}" stroke-opacity="0.35" stroke-width="4"/>
</svg>`;

const textSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <g font-family="Georgia, 'Times New Roman', serif">
    <rect x="80" y="70" width="34" height="34" rx="8" fill="none" stroke="${BRAND_GOLD}" stroke-width="2"/>
    <text x="97" y="96" text-anchor="middle" font-size="19" font-weight="bold" fill="${BRAND_GOLD}">LD</text>
    <text x="128" y="95" font-family="Helvetica, Arial, sans-serif" font-size="17" letter-spacing="5"
      font-weight="bold" fill="#f4f7fb">LEONARDO DiCAPRIO</text>

    <text x="80" y="275" font-size="96" font-weight="bold" fill="#ffffff">Leonardo</text>
    <text x="80" y="370" font-size="96" font-weight="bold" fill="#ffffff">DiCaprio</text>

    <rect x="80" y="410" width="86" height="4" fill="${BRAND_GOLD}"/>
    <text x="80" y="462" font-family="Helvetica, Arial, sans-serif" font-size="26" letter-spacing="1.5"
      fill="${BRAND_GOLD}">OFFICIAL DIGITAL ARCHIVE</text>

    <text x="80" y="524" font-family="Helvetica, Arial, sans-serif" font-size="19" fill="#c3cdda">
      Academy Award Winner · UN Messenger of Peace · Environmental Activist
    </text>
    <text x="80" y="578" font-family="Helvetica, Arial, sans-serif" font-size="17" letter-spacing="1"
      fill="#8b98a9">leonardodicaprioofficial.com</text>
  </g>
</svg>`;

await sharp({
  create: { width: 1200, height: 630, channels: 3, background: BRAND_BG },
})
  .composite([
    { input: photo, left: 1200 - photoWidth, top: 0 },
    { input: Buffer.from(overlaySvg), left: 0, top: 0 },
    { input: Buffer.from(textSvg), left: 0, top: 0 },
  ])
  .jpeg({ quality: 88, progressive: true, mozjpeg: true })
  .toFile(path.join(ogDir, 'leonardo-dicaprio-1200x630.jpg'));

console.log('✓ Created public/favicon.ico');
console.log('✓ Created public/icons/*.png');
console.log('✓ Created public/og/leonardo-dicaprio-1200x630.jpg');
