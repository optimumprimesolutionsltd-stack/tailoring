#!/usr/bin/env node
/**
 * Writes public/sitemap.xml from the route table in src/routes.ts.
 *
 * Generated rather than hand-written so the sitemap cannot drift from the
 * routes that actually exist. Run via `npm run sitemap`, and automatically before each build via `prebuild`.
 */

import { readFileSync, writeFileSync } from 'node:fs';

const SITE = process.env.SITE_URL ?? 'https://nyotaswerve.ke';

// Pull the paths straight out of the route table.
const source = readFileSync('src/routes.ts', 'utf8');
const block = source.slice(
  source.indexOf('export const PAGE_PATHS'),
  source.indexOf('};', source.indexOf('export const PAGE_PATHS')),
);

const paths = [...block.matchAll(/(\w+):\s*'([^']+)'/g)]
  .map(([, page, path]) => ({ page, path }))
  // The staff portal is disallowed in robots.txt; keep it out of the sitemap too.
  .filter(({ page }) => page !== 'admin');

if (paths.length === 0) {
  console.error('No routes found in src/routes.ts — sitemap not written.');
  process.exit(1);
}

// Home is the entry point; department pages sit just below it.
const priorityFor = (path) => (path === '/' ? '1.0' : '0.8');
const today = new Date().toISOString().slice(0, 10);

const urls = paths
  .map(
    ({ path }) => `  <url>
    <loc>${SITE}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priorityFor(path)}</priority>
  </url>`,
  )
  .join('\n');

writeFileSync(
  'public/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
  'utf8',
);

console.log(`sitemap.xml written — ${paths.length} URLs at ${SITE}`);
