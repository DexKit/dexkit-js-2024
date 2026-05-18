/**
 * DexKit blog OG banner (1200×630). See .cursor/rules/dexkit-blog-images.mdc
 *
 * Usage:
 *   node scripts/compose-blog-banner.mjs \
 *     --out deploy-token-allowance-drop-dexappbuilder.png \
 *     --line1 "Deploy" \
 *     --highlight "Token Allowance Drop" \
 *     --subtitle "ERC-20 Presale & Claim Guide" \
 *     --tagline "DexAppBuilder · No Code"
 */
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const LOGO = path.join(root, 'public/imgs/dexkit-logo-white-o-o.svg');
const WIDTH = 1200;
const HEIGHT = 630;
const LOGO_WIDTH = 200;

function parseArgs(argv) {
  const opts = {
    out: 'blog-banner.png',
    line1: 'Deploy',
    highlight: 'Token Allowance Drop',
    subtitle: 'ERC-20 Presale & Claim Guide',
    tagline: 'DexAppBuilder · No Code',
    iconLabel: 'ERC-20',
  };
  for (let i = 2; i < argv.length; i += 2) {
    const key = argv[i]?.replace(/^--/, '');
    const val = argv[i + 1];
    if (key && val !== undefined && key in opts) opts[key] = val;
  }
  return opts;
}

function escapeXml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function main() {
  const { out, line1, highlight, subtitle, tagline, iconLabel } = parseArgs(
    process.argv,
  );
  const outPath = path.join(root, 'public/blog-images', out);

  const logoPng = await sharp(LOGO)
    .resize({ width: LOGO_WIDTH })
    .png()
    .toBuffer();

  const highlightWidth = Math.min(920, Math.max(420, highlight.length * 34 + 80));

  const gradientSvg = `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#5F25E0"/>
          <stop offset="55%" style="stop-color:#8B2FC9"/>
          <stop offset="100%" style="stop-color:#F15A24"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
    </svg>`;

  const base = await sharp(Buffer.from(gradientSvg)).png().toBuffer();

  const nodesSvg = `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.35" stroke="white" stroke-width="1" fill="white">
        ${Array.from({ length: 8 }, (_, i) => {
          const x = 880 + (i % 4) * 70;
          const y = 420 + Math.floor(i / 4) * 55;
          return `<circle cx="${x}" cy="${y}" r="4"/><line x1="${x}" y1="${y}" x2="${x + 50}" y2="${y + 30}" opacity="0.6"/>`;
        }).join('')}
      </g>
    </svg>`;

  const nodes = await sharp(Buffer.from(nodesSvg)).png().toBuffer();

  const textSvg = `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <style>
        .h1 { font: bold 72px Arial, Helvetica, sans-serif; fill: white; }
        .h2box { font: bold 58px Arial, Helvetica, sans-serif; fill: white; }
        .sub { font: 36px Arial, Helvetica, sans-serif; fill: white; }
        .tag { font: 28px Arial, Helvetica, sans-serif; fill: white; opacity: 0.95; }
      </style>
      <text x="64" y="220" class="h1">${escapeXml(line1)}</text>
      <rect x="54" y="240" width="${highlightWidth}" height="88" rx="8" fill="#F24023"/>
      <text x="72" y="302" class="h2box">${escapeXml(highlight)}</text>
      <text x="64" y="380" class="sub">${escapeXml(subtitle)}</text>
      <text x="64" y="430" class="tag">${escapeXml(tagline)}</text>
      <rect x="64" y="540" width="200" height="48" rx="24" fill="none" stroke="#F24023" stroke-width="3"/>
      <text x="88" y="572" class="tag">dexkit.com</text>
      <circle cx="980" cy="310" r="110" fill="none" stroke="white" stroke-width="8" opacity="0.9"/>
      <circle cx="980" cy="310" r="78" fill="none" stroke="white" stroke-width="5" opacity="0.7"/>
      <text x="980" y="325" text-anchor="middle" class="sub" style="font-size:32px;font-weight:bold">${escapeXml(iconLabel)}</text>
      <circle cx="1060" cy="390" r="48" fill="white" opacity="0.95"/>
      <text x="1060" y="405" text-anchor="middle" style="font:bold 42px Arial; fill:#5F25E0">↓</text>
    </svg>`;

  const textLayer = await sharp(Buffer.from(textSvg)).png().toBuffer();

  await sharp(base)
    .composite([
      { input: nodes, top: 0, left: 0 },
      { input: logoPng, top: 40, left: 48 },
      { input: textLayer, top: 0, left: 0 },
    ])
    .png()
    .toFile(outPath);

  console.log('Wrote', outPath);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
