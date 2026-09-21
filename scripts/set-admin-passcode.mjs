#!/usr/bin/env node
/**
 * Sets the admin portal passcode.
 *
 *   npm run set-passcode
 *
 * Prompts for a passcode, writes only its SHA-256 hash into .env.local, and
 * never stores the passcode itself. .env.local is gitignored, so the hash does
 * not reach the repository — though it does reach the browser bundle at build
 * time, which is why this gate is obfuscation rather than real security. See
 * src/utils/adminAuth.ts for what that does and does not protect.
 */

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createInterface } from 'node:readline';

const ENV_FILE = '.env.local';
const KEY = 'VITE_ADMIN_PASSCODE_HASH';
const MIN_LENGTH = 8;

// A short passcode is allowed only when asked for explicitly:
//   npm run set-passcode -- --allow-short
// The guard stays on by default so nobody sets a weak one by accident.
const ALLOW_SHORT = process.argv.includes('--allow-short');

// One interface for the whole session: opening a second one closes stdin and
// the follow-up prompt then resolves empty.
const rl = createInterface({ input: process.stdin, output: process.stdout });

/** Hides typed characters when the terminal is interactive. */
let muted = false;
const baseWrite = rl._writeToOutput.bind(rl);
rl._writeToOutput = (text) => {
  if (muted && !text.includes('\n')) return;
  baseWrite(text);
};

// Queue incoming lines rather than calling rl.question twice: with piped stdin
// the stream ends after the first read and a second question never resolves.
const buffered = [];
const waiting = [];
let closed = false;

rl.on('line', (line) => {
  muted = false;
  const next = waiting.shift();
  if (next) next(line);
  else buffered.push(line);
});

rl.on('close', () => {
  closed = true;
  while (waiting.length) waiting.shift()(null);
});

const ask = (question) =>
  new Promise((resolve) => {
    process.stdout.write(question);
    const done = (line) => {
      process.stdout.write('\n');
      resolve(line === null ? null : line.trim());
    };
    if (buffered.length) return done(buffered.shift());
    if (closed) return done(null);
    waiting.push(done);
    muted = process.stdin.isTTY === true;
  });

const upsertEnvLine = (contents, key, value) => {
  const line = `${key}=${value}`;
  const pattern = new RegExp(`^${key}=.*$`, 'm');
  if (pattern.test(contents)) return contents.replace(pattern, line);
  return contents.length && !contents.endsWith('\n')
    ? `${contents}\n${line}\n`
    : `${contents}${line}\n`;
};

const fail = (message) => {
  console.error(`\n${message}`);
  rl.close();
  process.exit(1);
};

const passcode = await ask('New admin passcode: ');
if (passcode === null) fail('No passcode entered. Nothing was changed.');
if (passcode.length < MIN_LENGTH && !ALLOW_SHORT) {
  fail(
    `Too short — use at least ${MIN_LENGTH} characters, ` +
    `or pass --allow-short if this is deliberately temporary. Nothing was changed.`,
  );
}

if (passcode.length < MIN_LENGTH) {
  console.warn(
    `
Warning: ${passcode.length}-character passcode. Treat this as temporary ` +
    `and replace it before the site gets real traffic.`,
  );
}

const confirmation = await ask('Confirm passcode: ');
if (confirmation !== passcode) {
  fail('The two entries did not match. Nothing was changed.');
}

const hash = createHash('sha256').update(passcode).digest('hex');
const existing = existsSync(ENV_FILE) ? readFileSync(ENV_FILE, 'utf8') : '';
writeFileSync(ENV_FILE, upsertEnvLine(existing, KEY, hash), 'utf8');

console.log(`Saved the passcode hash to ${ENV_FILE}.`);
console.log('Restart the dev server (or rebuild) for it to take effect.');
rl.close();
