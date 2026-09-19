/**
 * Responsive sources for the atelier's own photography.
 *
 * The originals are ~1080px wide, but most of them are painted into cards and
 * grid tiles around 300px across — so a visitor was downloading roughly three
 * times the pixels they could see. On Kenyan mobile data that is both slow and
 * an actual cost to the customer.
 *
 * `npm run images` writes a 640px WebP beside each JPEG (about 66% smaller);
 * the browser then picks whichever fits the slot it is painting into.
 */

const CLIENT_PREFIX = '/clients/';

/** Nominal intrinsic width of the full-size originals. */
const FULL_WIDTH = 1080;
const SMALL_WIDTH = 640;

/**
 * Build a srcset for a client photograph. Returns undefined for anything else
 * (stock imagery, data URLs, admin uploads) so callers can spread it safely.
 */
export const srcSetFor = (src: string | undefined): string | undefined => {
  if (!src || !src.startsWith(CLIENT_PREFIX) || !src.endsWith('.jpg')) return undefined;
  const base = src.slice(0, -'.jpg'.length);
  return `${base}-640.webp ${SMALL_WIDTH}w, ${base}.webp ${FULL_WIDTH}w`;
};

/**
 * Props to spread onto an <img>. `sizes` should describe how wide the image is
 * actually painted — without it the browser assumes full viewport width and
 * downloads the large file anyway, which defeats the whole exercise.
 */
export const responsiveImage = (
  src: string | undefined,
  sizes: string,
): { src: string | undefined; srcSet?: string; sizes?: string } => {
  const srcSet = srcSetFor(src);
  return srcSet ? { src, srcSet, sizes } : { src };
};
