/**
 * Admin passcode checking.
 *
 * IMPORTANT — what this does and does not protect.
 *
 * This site is a static bundle with no backend, so every check here runs on the
 * visitor's own machine and a determined person can bypass it with devtools.
 * This is obfuscation, not access control.
 *
 * It is nevertheless worth doing, because it stops the realistic case: someone
 * who finds /#admin and tries the obvious passcodes. What it deliberately fixes
 * versus the original code is that the passcode is no longer a plaintext string
 * sitting in the shipped JavaScript — only its SHA-256 hash ships, and the hash
 * comes from an untracked .env.local rather than from source.
 *
 * The reason the residual risk is acceptable: the admin panel only edits data in
 * the viewer's own localStorage. There is no server, no customer database and no
 * credentials behind this gate, so bypassing it gains an attacker nothing beyond
 * editing their own copy of the page. If a real backend is ever added, this must
 * be replaced with server-side authentication.
 */

const LOCKOUT_KEY = 'nyota_admin_lockout';
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 60_000;

/** Hash of the configured passcode; set via .env.local, never committed. */
const CONFIGURED_HASH = (import.meta.env.VITE_ADMIN_PASSCODE_HASH ?? '')
  .trim()
  .toLowerCase();

export const isAdminConfigured = (): boolean => CONFIGURED_HASH.length === 64;

export const sha256Hex = async (value: string): Promise<string> => {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

/** Constant-time-ish comparison; both values are fixed-length hex digests. */
const hashesMatch = (a: string, b: string): boolean => {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
};

interface LockoutState {
  attempts: number;
  until: number;
}

const readLockout = (): LockoutState => {
  try {
    const raw = sessionStorage.getItem(LOCKOUT_KEY);
    if (raw) return JSON.parse(raw) as LockoutState;
  } catch {
    /* sessionStorage can throw in private mode; fall through to a clean state */
  }
  return { attempts: 0, until: 0 };
};

const writeLockout = (state: LockoutState): void => {
  try {
    sessionStorage.setItem(LOCKOUT_KEY, JSON.stringify(state));
  } catch {
    /* non-fatal: lockout then only lasts for this page view */
  }
};

/** Milliseconds remaining on a lockout, or 0 when not locked out. */
export const lockoutRemainingMs = (): number => {
  const { until } = readLockout();
  return Math.max(0, until - Date.now());
};

export const clearLockout = (): void => writeLockout({ attempts: 0, until: 0 });

export type AuthResult =
  | { ok: true }
  | { ok: false; reason: 'unconfigured' | 'locked' | 'incorrect'; retryInMs?: number };

export const verifyPasscode = async (passcode: string): Promise<AuthResult> => {
  if (!isAdminConfigured()) return { ok: false, reason: 'unconfigured' };

  const remaining = lockoutRemainingMs();
  if (remaining > 0) return { ok: false, reason: 'locked', retryInMs: remaining };

  const candidate = await sha256Hex(passcode);
  if (hashesMatch(candidate, CONFIGURED_HASH)) {
    clearLockout();
    return { ok: true };
  }

  const state = readLockout();
  const attempts = state.attempts + 1;
  if (attempts >= MAX_ATTEMPTS) {
    writeLockout({ attempts: 0, until: Date.now() + LOCKOUT_MS });
    return { ok: false, reason: 'locked', retryInMs: LOCKOUT_MS };
  }

  writeLockout({ attempts, until: 0 });
  return { ok: false, reason: 'incorrect' };
};

export const attemptsRemaining = (): number =>
  Math.max(0, MAX_ATTEMPTS - readLockout().attempts);
