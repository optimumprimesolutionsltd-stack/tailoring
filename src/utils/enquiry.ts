/**
 * Enquiry delivery helpers.
 *
 * This site has no backend. Every enquiry therefore has to leave the browser
 * through a channel the client already owns: WhatsApp (primary, since the
 * atelier runs on it) or email (fallback, for desktop users without WhatsApp).
 *
 * Nothing is "submitted" until one of these opens, so UI copy must never claim
 * the atelier has received a message before the client has actually sent it.
 */

import { BRAND_INFO } from '../data/tailoringData';

/**
 * Drops omitted optional fields (written as `cond && 'line'`) while keeping
 * deliberate '' spacers, so the message keeps its blank lines between sections.
 */
const compose = (lines: (string | false | null | undefined)[]): string =>
  lines.filter((line): line is string => typeof line === 'string').join('\n');

export const buildWhatsAppUrl = (message: string): string =>
  `https://wa.me/${BRAND_INFO.whatsapp}?text=${encodeURIComponent(message)}`;

export const buildMailtoUrl = (subject: string, body: string): string =>
  `mailto:${BRAND_INFO.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;

/**
 * Opens WhatsApp in a new tab. Must be called directly from a user gesture
 * (a submit or click handler) or the popup blocker will swallow it.
 *
 * Returns false when the window was blocked, so callers can keep the manual
 * link visible rather than telling the client their message is on its way.
 */
export const openWhatsApp = (message: string): boolean => {
  const win = window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  return win !== null;
};

export { compose };
