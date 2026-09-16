// GENERATED from the searchcode.ai customer API contract. Do not edit by hand.
// CLI command-table tests.

import { test } from 'node:test';
import assert from 'node:assert/strict';
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

test('every parameter carries a description', () => {
  for (const command of COMMANDS) {
    for (const param of [...command.positional, ...command.flags]) {
      assert.ok(param.description?.length > 0, `${command.name}.${param.name}`);
    }
  }
});
