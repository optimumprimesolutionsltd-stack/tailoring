#!/usr/bin/env node
/**
 * Generates WebP derivatives for the atelier's photography.
 *
 *   npm run images
 *
 * For every JPEG in public/clients it writes:
 *   name.webp       full size, for the hero and the lightbox
 *   name-640.webp   640px wide, for cards and grid tiles
 *
 * The 640px variant is where the saving is: tiles paint at roughly 300px but
 * were loading the full ~1080px original — about three times the pixels a
 * visitor could actually see, paid for out of their mobile data.
 *
 * Requires ffmpeg with libwebp on PATH. Existing derivatives are skipped unless
 * the JPEG is newer, so re-running is cheap.
 */

import { readdirSync, statSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const DIR = 'public/clients';
const QUALITY_FULL = 82;
const QUALITY_SMALL = 80;
const SMALL_WIDTH = 640;

const hasFfmpeg = () => {
  try {
    execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
};

if (!hasFfmpeg()) {
  console.error('ffmpeg not found on PATH — cannot generate WebP derivatives.');
  process.exit(1);
}

if (!existsSync(DIR)) {
  console.error(`${DIR} does not exist.`);
  process.exit(1);
}

const isStale = (src, out) =>
  !existsSync(out) || statSync(src).mtimeMs > statSync(out).mtimeMs;

const run = (args) => execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args]);

let written = 0;
let skipped = 0;

for (const file of readdirSync(DIR).filter((f) => f.endsWith('.jpg'))) {
  const src = path.join(DIR, file);
  const base = path.join(DIR, file.slice(0, -'.jpg'.length));

  for (const [out, args] of [
    [`${base}.webp`, ['-c:v', 'libwebp', '-quality', String(QUALITY_FULL), '-compression_level', '6']],
    [
      `${base}-640.webp`,
      ['-vf', `scale=${SMALL_WIDTH}:-2`, '-c:v', 'libwebp', '-quality', String(QUALITY_SMALL), '-compression_level', '6'],
    ],
  ]) {
    if (isStale(src, out)) {
      run(['-i', src, ...args, out]);
      written += 1;
    } else {
      skipped += 1;
    }
  }
}

console.log(`WebP derivatives: ${written} written, ${skipped} up to date.`);
