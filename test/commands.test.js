// GENERATED from the searchcode.ai customer API contract. Do not edit by hand.
// CLI command-table tests.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { CUSTOMER_API_ROUTES } from '@searchcode/core';
import { COMMANDS } from '../src/commands.js';

const npmRoutes = Object.values(CUSTOMER_API_ROUTES).filter((r) => r.auth === 'api_key' && r.npmOperation);

test('every contract operation has a command', () => {
  assert.equal(COMMANDS.length, npmRoutes.length);
  for (const route of npmRoutes) {
    const command = COMMANDS.find((c) => c.routeId === route.id);
    assert.ok(command, `no command for ${route.id}`);
    assert.equal(command.operation, route.npmOperation);
  }
});

test('command names are unique and shell-safe', () => {
  const names = COMMANDS.map((c) => c.name);
  assert.equal(new Set(names).size, names.length);
  for (const name of names) assert.match(name, /^[a-z][a-z0-9-]*$/);
});

test('advertised credits and plan match the contract', () => {
  for (const command of COMMANDS) {
    const route = CUSTOMER_API_ROUTES[command.routeId];
    assert.equal(command.credits, route.meter.credits, command.name);
    assert.equal(command.minTier, route.minTier, command.name);
  }
});

test('every required parameter is listed as required', () => {
  for (const command of COMMANDS) {
    const route = CUSTOMER_API_ROUTES[command.routeId];
    const required = (route.params ?? []).filter((p) => p.required).map((p) => p.name).sort();
    assert.deepEqual([...command.required].sort(), required, command.name);
  }
});

test('path parameters are positional, query parameters are flags', () => {
  for (const command of COMMANDS) {
    const route = CUSTOMER_API_ROUTES[command.routeId];
    const path = (route.params ?? []).filter((p) => p.in === 'path').map((p) => p.name);
    const query = (route.params ?? []).filter((p) => p.in === 'query').map((p) => p.name);
    assert.deepEqual(command.positional.map((p) => p.name), path, command.name);
    assert.deepEqual(command.flags.map((f) => f.name), query, command.name);
  }
});

// npm installs a bin as a symlink. A guard that compares import.meta.url to process.argv[1]
// directly never matches through an install, so the command exits 0 and prints nothing — the
// failure mode is silence, which is why it survived every other test. Verified by running the
// packed tarball through a real npm install.
test('the entrypoint guard survives the npm bin symlink', async () => {
  const source = await readFile(new URL('../src/index.js', import.meta.url), 'utf8');
  assert.ok(
    !source.includes('import.meta.url === '),
    'comparing import.meta.url to argv[1] breaks when npm installs the bin as a symlink',
  );
  assert.match(source, /realpathSync/, 'the entrypoint check must resolve symlinks');
});

test('every parameter carries a description', () => {
  for (const command of COMMANDS) {
    for (const param of [...command.positional, ...command.flags]) {
      assert.ok(param.description?.length > 0, `${command.name}.${param.name}`);
    }
  }
});

// The renderer picks the row array by name, and the API names it after what it returns:
// "sites" from a technology query, "domains" from the domain index, "results" from a search.
// These payloads are the real gateway shapes. If the renderer stops recognising one, output
// silently degrades to raw JSON — which is exactly the regression these pin down. The live
// smoke test (scripts/smoke-public-clients.mjs) checks the same thing against production.
const GATEWAY_SHAPES = [
  ['technology query', { technology: 'React', total_sites: 1234567, sites: [{ domain: 'a.com', rank: 1 }], offset: 0 }],
  ['domain index', { total: 42, total_is_exact: true, domains: [{ domain: 'b.com' }], limit: 10 }],
  ['facet count', { kind: 'tech', signal: 'React', sites: 1234567 }],
  ['search results', { results: [{ domain: 'c.com', blob_hash: 'x' }], next_cursor: null }],
];

for (const [name, payload] of GATEWAY_SHAPES) {
  test(`the renderer reads the ${name} response shape`, async () => {
    const source = await readFile(new URL('../src/index.js', import.meta.url), 'utf8');
    const match = source.match(/const rows = ([^;]+);/);
    assert.ok(match, 'the renderer no longer looks up rows the way this test expects');
    const known = [...match[1].matchAll(/payload\.([a-z_]+)/g)].map((m) => m[1]);
    const arrayKey = Object.keys(payload).find((k) => Array.isArray(payload[k]));
    if (arrayKey) {
      assert.ok(
        known.includes(arrayKey),
        `the renderer would print raw JSON for a ${name}: it returns "${arrayKey}", ` +
          `and the renderer only knows ${known.join(', ')}`,
      );
    }
  });
}
