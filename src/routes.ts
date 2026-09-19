import { PageId } from './types';

/**
 * Real URLs, not hash fragments.
 *
 * The site previously addressed pages as `/#offerings`. Search engines treat a
 * fragment as the same document, so the whole site was indexed as one page and
 * could not rank for the searches that actually matter to a local atelier
 * ("wedding suits Ruiru", "bespoke tailoring Kiambu"). Each department now has
 * its own path and its own title and description.
 *
 * Serving these paths needs an SPA fallback on the host — see `public/_redirects`.
 */

export const PAGE_PATHS: Record<PageId, string> = {
  home: '/',
  offerings: '/offerings',
  fabrics: '/fabrics',
  process: '/process',
  journal: '/journal',
  booking: '/booking',
  faq: '/faq',
  contact: '/contact',
  admin: '/admin',
};

interface PageMeta {
  title: string;
  description: string;
}

/** Per-page title and description. Front-loaded with the garment and the town,
 *  because that is what a customer types into Google. */
export const PAGE_META: Record<PageId, PageMeta> = {
  home: {
    title: 'Bespoke Tailoring in Ruiru, Kenya | Nyota. Swerve. Closet',
    description:
      'Bespoke suits, wedding and groomsmen attire hand-tailored in Kimbo, Ruiru. Over 30 anatomical measurements, European cloth, 4-day express turnaround.',
  },
  offerings: {
    title: 'Bespoke Suits, Tuxedos & Wedding Attire | Nyota. Swerve. Closet',
    description:
      'Custom two- and three-piece suits, black-tie tuxedos, groomsmen packages, blazers and shirts, hand-tailored in Ruiru with transparent KES pricing.',
  },
  fabrics: {
    title: 'European Cloth Library — Scabal, Loro Piana | Nyota. Swerve. Closet',
    description:
      'Browse Super 110s to 180s wools, Irish linens and silks from Scabal, Loro Piana, Dormeuil and Holland & Sherry, with an interactive drape visualiser.',
  },
  process: {
    title: 'How a Bespoke Suit Is Made | Nyota. Swerve. Closet',
    description:
      'From 30+ anatomical posture measurements to hand-basted canvas and final press — the step-by-step bespoke process at our Ruiru atelier.',
  },
  journal: {
    title: 'Style Journal — Suit Etiquette & Fabric Guides | Nyota. Swerve. Closet',
    description:
      'Guidance on buttoning stance, Nairobi climate dressing, wedding colour palettes, black-tie etiquette and caring for a bespoke garment.',
  },
  booking: {
    title: 'Book a Fitting & Price Your Suit | Nyota. Swerve. Closet',
    description:
      'Estimate your commission in KES or USD and book a private fitting at our Kimbo, Ruiru atelier or by mobile concierge across Nairobi.',
  },
  faq: {
    title: 'Bespoke Tailoring FAQ & Garment Care | Nyota. Swerve. Closet',
    description:
      'Answers on 4-day express turnaround, cloth sourcing, alterations, garment care and our mobile concierge coverage across Nairobi and Kiambu.',
  },
  contact: {
    title: 'Visit Our Ruiru Atelier | Nyota. Swerve. Closet',
    description:
      'Find us in Kimbo, Ruiru, Kiambu County. Opening hours, WhatsApp, phone and directions to the atelier.',
  },
  admin: {
    title: 'Atelier Management | Nyota. Swerve. Closet',
    description: 'Staff portal.',
  },
};

const BY_PATH = new Map<string, PageId>(
  (Object.entries(PAGE_PATHS) as [PageId, string][]).map(([page, path]) => [path, page]),
);

/** Resolve a pathname to a page, tolerating trailing slashes and casing. */
export const pathToPage = (pathname: string): PageId | null => {
  let clean = pathname.toLowerCase();
  if (clean.length > 1 && clean.endsWith('/')) clean = clean.slice(0, -1);
  return BY_PATH.get(clean || '/') ?? null;
};

export const pageToPath = (page: PageId): string => PAGE_PATHS[page] ?? '/';

/**
 * Links shared before the move to real URLs still carry `#booking`. Those are
 * out in the world on WhatsApp and must keep working, so a legacy fragment is
 * translated once and cleared from the address bar.
 */
export const legacyHashToPage = (hash: string): PageId | null => {
  const id = hash.replace('#', '').toLowerCase();
  return id && id in PAGE_PATHS ? (id as PageId) : null;
};

/** Keep the document head in step with the current route. */
export const applyPageMeta = (page: PageId): void => {
  const meta = PAGE_META[page];
  if (!meta) return;

  document.title = meta.title;

  const setTag = (selector: string, attr: string, value: string) => {
    const el = document.head.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  };

  setTag('meta[name="description"]', 'content', meta.description);
  setTag('meta[property="og:title"]', 'content', meta.title);
  setTag('meta[property="og:description"]', 'content', meta.description);
  setTag('meta[name="twitter:title"]', 'content', meta.title);
  setTag('meta[name="twitter:description"]', 'content', meta.description);

  const url = `https://nyotaswerve.ke${pageToPath(page)}`;
  setTag('link[rel="canonical"]', 'href', url);
  setTag('meta[property="og:url"]', 'content', url);

  // The staff portal must never be indexed, even if it is linked.
  let robots = document.head.querySelector('meta[name="robots"]');
  if (page === 'admin') {
    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }
    robots.setAttribute('content', 'noindex, nofollow');
  } else if (robots) {
    robots.remove();
  }
};
