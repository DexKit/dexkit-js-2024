#!/usr/bin/env node
/**
 * Submit URLs to IndexNow (Bing, Yandex, Naver, Seznam, etc.).
 *
 * Usage:
 *   node scripts/notify-indexnow.mjs --urls https://dexkit.com/blog/slug
 *   node scripts/notify-indexnow.mjs --from-git HEAD~1
 *   node scripts/notify-indexnow.mjs --from-git "$BEFORE_SHA" "$AFTER_SHA"
 *
 * Env (optional overrides):
 *   INDEXNOW_KEY          default: key from public/{key}.txt
 *   INDEXNOW_HOST         default: dexkit.com
 *   INDEXNOW_ENDPOINT     default: https://api.indexnow.org/indexnow
 *   INDEXNOW_SITE_URL     default: https://dexkit.com
 *   INDEXNOW_DRY_RUN=true print payload only
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = (process.env.INDEXNOW_SITE_URL || 'https://dexkit.com').replace(
  /\/$/,
  '',
);
const HOST = process.env.INDEXNOW_HOST || new URL(SITE_URL).host;
const ENDPOINT =
  process.env.INDEXNOW_ENDPOINT || 'https://api.indexnow.org/indexnow';
const DEFAULT_KEY = '4171b1da1a684e82911439ebbc0a73c4';

function resolveKey() {
  const fromEnv = process.env.INDEXNOW_KEY?.trim();
  if (fromEnv) return fromEnv;

  const keyPath = path.join(process.cwd(), 'public', `${DEFAULT_KEY}.txt`);
  if (fs.existsSync(keyPath)) {
    const content = fs.readFileSync(keyPath, 'utf8').trim();
    if (content) return content;
  }
  return DEFAULT_KEY;
}

function blogUrlFromRepoPath(filePath) {
  const normalized = filePath.replace(/\\/g, '/');
  const en = normalized.match(/(?:^|\/)content\/blog\/([^/]+)\.md$/);
  if (en) return `${SITE_URL}/blog/${en[1]}`;
  const pt = normalized.match(/(?:^|\/)content\/blog-pt\/([^/]+)\.md$/);
  if (pt) return `${SITE_URL}/pt/blog/${pt[1]}`;
  const es = normalized.match(/(?:^|\/)content\/blog-es\/([^/]+)\.md$/);
  if (es) return `${SITE_URL}/es/blog/${es[1]}`;
  return null;
}

function urlsFromGitDiff(range) {
  const out = execSync(`git diff --name-only --diff-filter=ACMR ${range}`, {
    encoding: 'utf8',
  });
  const urls = new Set();
  for (const line of out.split('\n')) {
    const url = blogUrlFromRepoPath(line.trim());
    if (url) urls.add(url);
  }
  return [...urls];
}

function parseArgs(argv) {
  const urls = [];
  let dryRun = process.env.INDEXNOW_DRY_RUN === 'true';

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--dry-run') {
      dryRun = true;
      continue;
    }
    if (arg === '--urls') {
      while (argv[i + 1] && !argv[i + 1].startsWith('--')) {
        urls.push(argv[++i]);
      }
      continue;
    }
    if (arg === '--from-git') {
      const a = argv[i + 1];
      const b = argv[i + 2];
      if (a && b && !a.startsWith('--') && !b.startsWith('--')) {
        i += 2;
        urls.push(...urlsFromGitDiff(`${a}...${b}`));
      } else if (a && !a.startsWith('--')) {
        i += 1;
        urls.push(...urlsFromGitDiff(a));
      } else {
        urls.push(...urlsFromGitDiff('HEAD~1'));
      }
      continue;
    }
  }

  return { urls: [...new Set(urls)], dryRun };
}

async function submit(urls, dryRun) {
  if (urls.length === 0) {
    console.log('IndexNow: no blog URLs to submit.');
    return;
  }

  const key = resolveKey();
  const payload = {
    host: HOST,
    key,
    keyLocation: `${SITE_URL}/${key}.txt`,
    urlList: urls,
  };

  console.log(`IndexNow: submitting ${urls.length} URL(s) for host ${HOST}`);
  for (const u of urls) console.log(`  - ${u}`);

  if (dryRun) {
    console.log('IndexNow dry-run payload:', JSON.stringify(payload, null, 2));
    return;
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });

  const body = await res.text();
  if (res.status === 200 || res.status === 202) {
    console.log(`IndexNow: accepted (HTTP ${res.status})`);
    return;
  }

  console.error(`IndexNow: failed HTTP ${res.status} ${body.slice(0, 500)}`);
  process.exitCode = 1;
}

const { urls, dryRun } = parseArgs(process.argv.slice(2));
submit(urls, dryRun).catch((err) => {
  console.error('IndexNow: unexpected error', err);
  process.exitCode = 1;
});
