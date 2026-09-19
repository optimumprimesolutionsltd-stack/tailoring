# Nyota. Swerve. Closet — Bespoke Tailoring Kenya

Marketing site for a Nairobi bespoke tailoring atelier. React 19 + TypeScript + Vite, styled with Tailwind 4.

## Running it

**Prerequisites:** Node.js 20+

```bash
npm install
npm run dev
```

The dev server runs on **port 5173**. (Port 3000 is deliberately avoided — another
service on this machine uses it.)

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload on :5173 |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Typecheck (`tsc --noEmit`) |
| `npm run set-passcode` | Set the admin portal passcode |
| `npm run sitemap` | Regenerate `public/sitemap.xml` from the route table (runs on every build) |
| `npm run images` | Generate WebP derivatives for `public/clients` (needs ffmpeg) |

## How enquiries reach you

**There is no backend.** Every form composes a message and hands it to a channel
you already own:

| Form | Goes to |
| --- | --- |
| Booking & quotation | WhatsApp (with the full quote), email fallback |
| Contact enquiry | WhatsApp, email fallback |
| Fabric swatch request | WhatsApp, email fallback |
| Client review | WhatsApp for manual approval, email fallback |
| Partnership / beta interest | Email, WhatsApp fallback |

Nothing is stored on a server. A form is only delivered once the client presses
send in WhatsApp or their mail app, so the confirmation screens say so rather
than claiming the atelier has already received the message. If the browser blocks
the popup, the confirmation shows a manual send button instead.

The destination number and address come from `BRAND_INFO` in
[`src/data/tailoringData.ts`](src/data/tailoringData.ts).

## Admin portal

At `/#admin`. Manages prices, photos and the catalogue.

Set a passcode before first use:

```bash
npm run set-passcode
```

That stores only a SHA-256 hash in `.env.local` (gitignored). Until it is set,
the portal refuses every login and shows a setup notice.

> **This gate is obfuscation, not security.** The site is a static bundle, so the
> check runs on the visitor's machine and can be bypassed with devtools. It is
> still worth having — it stops casual poking at `/#admin` — and the residual
> risk is low because the panel only edits data in the viewer's own browser.
> There is no server, customer database or credential behind it. **If a backend is
> ever added, replace this with real server-side authentication.** See the note at
> the top of [`src/utils/adminAuth.ts`](src/utils/adminAuth.ts).

### Admin data is per-browser

Prices, photos and catalogue edits are saved to `localStorage`, so they apply
**only to the browser you made them in** — visitors will not see them. The
"Local Quote Records" tab likewise shows only quotes built on that device; real
client bookings arrive on WhatsApp. Making edits visible to visitors means either
editing `src/data/tailoringData.ts` and redeploying, or adding a backend.

## Routing, SEO and sharing

Pages are real URLs defined in [`src/routes.ts`](src/routes.ts), which also holds
each page's title and description. `applyPageMeta` keeps `<title>`, the meta
description, `og:` tags and the canonical link in step with the route — distinct
URLs only help if each carries its own metadata.

Add a route in one place: `PAGE_PATHS` plus `PAGE_META`. The sitemap is generated
from that same table, so it cannot drift.

**Legacy `#hash` links still work.** Links shared on WhatsApp before the move are
translated once on load and the fragment is cleared. Do not remove
`legacyHashToPage` — those links are out in the world.

**`og:image` is load-bearing.** This atelier sells through WhatsApp, and without
a preview image a shared link renders as a bare URL. `public/og-image.jpg` is
1200×630 as the spec requires. If you change it, keep those dimensions and keep
the URL absolute — WhatsApp will not resolve a relative path.

**Set the real domain.** `https://nyotaswerve.ke` is hard-coded in `index.html`,
`src/routes.ts`, `public/robots.txt` and the sitemap generator. Change all four
when the domain is confirmed, or pass `SITE_URL` to the sitemap script.

## Images

`public/clients/*.jpg` are the originals. `npm run images` writes a full-size
`.webp` and a 640px `-640.webp` beside each one, and `responsiveImage()` in
[`src/utils/images.ts`](src/utils/images.ts) builds the `srcset`.

The 640px variant is the whole point: grid tiles paint at roughly 300px but were
loading ~1080px originals — about three times the pixels a visitor could see,
paid for out of their mobile data. The portfolio grid dropped from ~2.3 MB to
769 KB.

**Always pass a truthful `sizes`.** Without it the browser assumes full viewport
width and downloads the large file anyway, which defeats the exercise.

## Typography

| Role | Face | Where |
| --- | --- | --- |
| Headings | Cormorant Garamond 600/700 | `h1`–`h3`, `.font-display` |
| Wordmark | Cinzel | `.font-wordmark` — BrandLogo only |
| Body & UI | Plus Jakarta Sans 300–700 | default on `body` |
| Pull quotes | Cormorant Garamond 400 | `.font-editorial` — quotes only, never body copy |

**Cinzel is confined to the wordmark on purpose.** It is a Trajan-style
inscriptional face with no true lowercase — its "lowercase" glyphs render at 86%
of cap height (a normal face is ~72%), so every heading came out in capitals no
matter what the source said. That is fine for a logo and wrong for 81 headings:
all-caps flattens word shapes and slows reading. Cormorant has real lowercase, so
sentence case renders as written, and the hero headline fell from four lines to
two.

**Do not set body copy in `.font-editorial`.** Cormorant is a high-contrast
display serif whose thin strokes go weak at paragraph sizes, especially on the
light background. The hero intro was previously set in it at `font-light` — a
weight that was never even downloaded, so the browser substituted silently.

Only weights that are actually used are requested. Before changing the Google
Fonts link, check the rendered weights first: an unrequested weight does not
fail loudly, it just renders as something you did not choose.

## Colour system

Light, warm and editorial — the convention used by [Huntsman](https://www.huntsmansavilerow.com/),
[Drake's](https://www.drakes.com/) and [Suitsupply](https://suitsupply.com/). Tailoring sites go
light for a practical reason: a navy suit photographed against black reads as
black. Cloth colour has to read true when the cloth is the product.

| Role | Token | Notes |
| --- | --- | --- |
| Page background | `#EDE7DC` | Warm greige. Deliberately *not* white — near-white glares and flattens the photography |
| Card / raised surface | `#FBF8F3` | Sits just above the base so cards separate |
| Alt section | `#E4DCCE` | |
| Border | `#D6CBB8` | `#BCAE97` on hover |
| Headings | `#171412` | |
| Body copy | `#2B2723` | |
| Secondary copy | `#524C43` | |
| Accent (text, icons, rules) | `#6E5410` | Dark antique gold |
| Accent (fills, badges) | `#D4AF37` | Bright gold, dark text on top |
| Dark surface (CTAs) | `#171412` | `#FBF8F3` text |

Two rules keep it coherent:

1. **Gold marks, it does not narrate.** Prices, icons, rules and key links are
   gold; anything you *read* is neutral. Bright `#D4AF37` scores only 1.98:1 on
   the light base, so gold used as *text* must be the darker `#6E5410`.
2. **Text on a photograph is light, whatever the theme.** Portfolio captions and
   the directory card titles sit on images with a dark scrim and stay
   `#FBF8F3`. Text on a card follows the light theme. Confusing the two is what
   makes a re-theme look broken.

Every piece of text on the home page clears WCAG AA; the lowest ratio is 5.25:1.

## Photography

All photography in `public/clients/` is real client work, supplied by the atelier
and published with the clients' permission. It drives the hero, the department
cards, the About section, seven of the service cards and the portfolio.

Captions in `CLIENT_PORTFOLIO` (`src/data/tailoringData.ts`) describe only what is
visible in each frame. Do not add fabric, mill, price or date claims to a real
client's garment unless the atelier has confirmed them.

The photographs are portrait (3:4). That drives several layout decisions —
notably the hero, which places the image to the right on desktop rather than
cropping a portrait frame into a shallow horizontal band. Keep that in mind
before swapping in landscape images.

## Known gaps

- **Testimonials are fictional and currently hidden.** The entries in
  `TESTIMONIALS` (`src/data/tailoringData.ts`) are invented sample content that the
  UI renders with "Verified Bespoke Client" badges, so `<PortfolioSection />` was
  put in their place on the home and Craft & Process pages. Replace the array with
  real, consented reviews before re-enabling the section in `App.tsx`.
- **Some stock imagery remains**: tuxedos, waistcoats, overcoats and the
  accessories still use Unsplash placeholders, along with the fabric swatches in
  `src/data/fabricSwatches.ts`. Replace them as real photographs become available.
- **`nyotaswerve.ke`** is asserted in the schema.org block in `index.html` but
  is not wired up. Update it when the real domain is live.
- **Images are unoptimised.** `public/clients/` is ~2.3 MB of JPEG at full size.
  Fine for launch; convert to WebP/AVIF with responsive `srcset` if load time on
  Kenyan mobile data becomes a concern.
- **Single ~660 kB JS bundle**, no code-splitting. Worth splitting per route if
  load time matters.
