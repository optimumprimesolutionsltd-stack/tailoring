import { BRAND_INFO } from './tailoringData';

/**
 * The brand details currently in effect, readable outside React.
 *
 * Contact details are editable in the admin panel, but `src/utils/enquiry.ts`
 * builds the WhatsApp and mailto URLs and is a plain module — it cannot call a
 * hook. Rather than thread the brand through every caller, the provider
 * publishes the live value here and non-React code reads it.
 *
 * Components should use `useTailoring().brand` instead, so they re-render when
 * the value changes. This exists only for code that runs outside the tree.
 */

export type BrandInfo = typeof BRAND_INFO;

let current: BrandInfo = BRAND_INFO;

/** Called by TailoringProvider whenever the brand details change. */
export const setLiveBrand = (brand: BrandInfo): void => {
  current = brand;
};

/** The brand details as last published by the provider. */
export const getLiveBrand = (): BrandInfo => current;
