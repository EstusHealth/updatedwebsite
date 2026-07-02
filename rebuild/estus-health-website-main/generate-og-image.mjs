/**
 * Generates the Open Graph social share image for Estus Health.
 * Output: public/og-image.png (1200×630px)
 *
 * Run with: node generate-og-image.mjs
 */

import sharp from 'sharp';
import { writeFileSync } from 'fs';

// Brand colours (from site.webmanifest + CSS design tokens)
const BROWN       = '#6B3A2A';   // primary brand brown
const BROWN_MED   = '#8C5C3E';   // medium brown
const BROWN_DARK  = '#3D1F14';   // deep brown
const CREAM       = '#F5F1E8';   // background cream
const CREAM_LIGHT = '#FAF7F2';   // slightly lighter cream

// Image dimensions (standard OG size)
const W = 1200;
const H = 630;

// SVG layout constants
const PADDING_LEFT  = 100;
const TOP_BAR_H     = 10;
const BOTTOM_BAR_H  = 64;
const BOTTOM_BAR_Y  = H - BOTTOM_BAR_H;

const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Subtle grain-like noise via feTurbulence -->
    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise"/>
      <feColorMatrix type="saturate" values="0" in="noise" result="grey"/>
      <feBlend in="SourceGraphic" in2="grey" mode="overlay" result="blend"/>
      <feComposite in="blend" in2="SourceGraphic" operator="in"/>
    </filter>

    <!-- Warm gradient for the heading text -->
    <linearGradient id="headingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="${BROWN}"/>
      <stop offset="100%" stop-color="${BROWN_MED}"/>
    </linearGradient>

    <!-- Clip path so nothing bleeds outside the canvas -->
    <clipPath id="canvas">
      <rect width="${W}" height="${H}"/>
    </clipPath>
  </defs>

  <!-- ── BACKGROUND ─────────────────────────────────────────────── -->
  <rect width="${W}" height="${H}" fill="${CREAM_LIGHT}" clip-path="url(#canvas)"/>

  <!-- Warm gradient wash (bottom-right) -->
  <radialGradient id="bgGlow" cx="85%" cy="80%" r="55%">
    <stop offset="0%"   stop-color="${BROWN_MED}" stop-opacity="0.10"/>
    <stop offset="100%" stop-color="${CREAM_LIGHT}" stop-opacity="0"/>
  </radialGradient>
  <rect width="${W}" height="${H}" fill="url(#bgGlow)" clip-path="url(#canvas)"/>

  <!-- ── DECORATIVE CIRCLES (right side) ───────────────────────── -->
  <!-- Large background circle -->
  <circle cx="980" cy="240" r="300" fill="${BROWN}" fill-opacity="0.06"/>
  <!-- Medium overlapping circle -->
  <circle cx="1120" cy="100" r="190" fill="${BROWN}" fill-opacity="0.09"/>
  <!-- Small accent dot -->
  <circle cx="860"  cy="460" r="55"  fill="${BROWN}" fill-opacity="0.12"/>
  <!-- Tiny dot cluster -->
  <circle cx="750"  cy="530" r="14"  fill="${BROWN}" fill-opacity="0.18"/>
  <circle cx="790"  cy="510" r="8"   fill="${BROWN}" fill-opacity="0.14"/>
  <circle cx="810"  cy="545" r="10"  fill="${BROWN}" fill-opacity="0.16"/>

  <!-- ── TOP BAR ────────────────────────────────────────────────── -->
  <rect x="0" y="0" width="${W}" height="${TOP_BAR_H}" fill="${BROWN}"/>

  <!-- ── LEFT ACCENT BAR ───────────────────────────────────────── -->
  <rect x="${PADDING_LEFT - 24}" y="80" width="7" height="370" rx="4" fill="${BROWN}" fill-opacity="0.55"/>

  <!-- ── PILL BADGE ─────────────────────────────────────────────── -->
  <rect x="${PADDING_LEFT}" y="88" width="296" height="40" rx="20"
        fill="${BROWN}" fill-opacity="0.12"/>
  <text x="${PADDING_LEFT + 18}" y="114"
        font-family="'Liberation Sans', 'DejaVu Sans', Arial, sans-serif"
        font-size="17" font-weight="700" letter-spacing="2.5"
        fill="${BROWN}" fill-opacity="0.85" text-anchor="start">
    OCCUPATIONAL THERAPY
  </text>

  <!-- ── MAIN HEADING ───────────────────────────────────────────── -->
  <!-- "ESTUS" -->
  <text x="${PADDING_LEFT}" y="258"
        font-family="'Liberation Sans', 'DejaVu Sans', Arial, sans-serif"
        font-size="128" font-weight="700"
        letter-spacing="-4"
        fill="url(#headingGradient)">ESTUS</text>

  <!-- "HEALTH" (slightly smaller, dark brown) -->
  <text x="${PADDING_LEFT}" y="368"
        font-family="'Liberation Sans', 'DejaVu Sans', Arial, sans-serif"
        font-size="116" font-weight="700"
        letter-spacing="-3"
        fill="${BROWN_DARK}">HEALTH</text>

  <!-- ── DIVIDER ────────────────────────────────────────────────── -->
  <rect x="${PADDING_LEFT}" y="393" width="520" height="2" rx="1"
        fill="${BROWN}" fill-opacity="0.25"/>

  <!-- ── TAGLINE ────────────────────────────────────────────────── -->
  <text x="${PADDING_LEFT}" y="440"
        font-family="'Liberation Sans', 'DejaVu Sans', Arial, sans-serif"
        font-size="31" font-weight="400"
        fill="${BROWN_MED}">Neuro-Affirming &amp; Gaming-Informed OT</text>

  <!-- ── SUB-TAGLINE ────────────────────────────────────────────── -->
  <text x="${PADDING_LEFT}" y="485"
        font-family="'Liberation Sans', 'DejaVu Sans', Arial, sans-serif"
        font-size="24" font-weight="400"
        fill="${BROWN}" fill-opacity="0.72">Perth  ·  Telehealth Australia-wide</text>

  <!-- ── BOTTOM BAR ─────────────────────────────────────────────── -->
  <rect x="0" y="${BOTTOM_BAR_Y}" width="${W}" height="${BOTTOM_BAR_H}" fill="${BROWN}"/>

  <!-- URL in bottom bar -->
  <text x="${PADDING_LEFT}" y="${BOTTOM_BAR_Y + 40}"
        font-family="'Liberation Sans', 'DejaVu Sans', Arial, sans-serif"
        font-size="22" font-weight="700" letter-spacing="1"
        fill="${CREAM_LIGHT}" fill-opacity="0.92">estushealth.com</text>

  <!-- Tagline in bottom bar (right-aligned) -->
  <text x="${W - PADDING_LEFT}" y="${BOTTOM_BAR_Y + 40}"
        font-family="'Liberation Sans', 'DejaVu Sans', Arial, sans-serif"
        font-size="18" font-weight="400"
        fill="${CREAM_LIGHT}" fill-opacity="0.65"
        text-anchor="end">Autonomy-first · Neurodivergent support</text>
</svg>
`.trim();

async function generate() {
  const outputPath = 'public/og-image.png';

  await sharp(Buffer.from(svg))
    .png({ quality: 95, compressionLevel: 8 })
    .toFile(outputPath);

  console.log(`✓ Generated ${outputPath} (${W}×${H})`);
}

generate().catch((err) => {
  console.error('Failed to generate OG image:', err);
  process.exit(1);
});
