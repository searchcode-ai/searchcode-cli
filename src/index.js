#!/usr/bin/env node
// GENERATED from the searchcode.ai customer API contract. Do not edit by hand.
// searchcode.ai command-line client.

import { Api, ApiError, configFromEnv, creditsFor, hintFor, minTierFor } from '@searchcode/core';
import { COMMANDS } from './commands.js';

function parseArgs(argv) {
  const positional = [];
  const flags = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') { flags.help = true; continue; }
    if (arg === '--json') { flags.json = true; continue; }
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (next === undefined || next.startsWith('--')) flags[key] = true;
      else { flags[key] = next; i++; }
      continue;
    }
    positional.push(arg);
  }
  return { positional, flags };
}

function usage() {
  const lines = [
    'searchcode — search the source code of the public web',
    '',
    'Usage: searchcode <command> [arguments] [--flags]',
    '',
    'Commands:',
  ];
  const width = Math.max(...COMMANDS.map((c) => c.name.length));
  for (const command of COMMANDS) {
    const cost = `${command.credits} cr`;
    lines.push(`  ${command.name.padEnd(width)}  ${command.summary} (${cost}, ${command.minTier}+)`);
  }
  lines.push(
    '',
    'Global flags:',
    '  --json        print the raw API response',
    '  --key <key>   override SEARCHCODE_API_KEY',
    '  --help        show this help, or help for a command',
    '',
    'Environment:',
    '  SEARCHCODE_API_KEY   your API key (required)',
    '  SEARCHCODE_API_URL   gateway base URL (default https://searchcode.ai)',
    '',
    'Docs: https://searchcode.ai/docs/',
  );
  return lines.join('\n');
}

function commandHelp(command) {
  const lines = [`searchcode ${command.name} — ${command.summary}`, ''];
  lines.push(`Costs ${command.credits} credit${command.credits === 1 ? '' : 's'}. Requires the ${command.minTier} plan or above.`);
  lines.push('');
  if (command.positional.length) {
    lines.push('Arguments:');
    for (const param of command.positional) {
      lines.push(`  <${param.name}>  ${param.description}`);
    }
    lines.push('');
  }
  if (command.flags.length) {
    lines.push('Flags:');
    const width = Math.max(...command.flags.map((f) => f.name.length));
    for (const flag of command.flags) {
      const req = flag.required ? ' (required)' : '';
      lines.push(`  --${flag.name.padEnd(width)}  ${flag.description}${req}`);
    }
    lines.push('');
  }
  if (command.example) lines.push('Example:', `  ${command.example}`, '');
  return lines.join('\n');
}

/** Render a response as readable text; --json prints the raw payload instead. */
function render(payload) {
  const rows = payload.results ?? payload.rows ?? payload.domains ?? payload.items;
  if (!Array.isArray(rows)) return JSON.stringify(payload, null, 2);
  if (rows.length === 0) return 'No results.';
  const out = [];
  if (typeof payload.total === 'number') out.push(`${payload.total} total`, '');
  for (const row of rows) {
    if (typeof row === 'string') { out.push(row); continue; }
    const primary = row.domain ?? row.name ?? row.host ?? row.title ?? '';
    const rest = Object.entries(row)
      .filter(([k, v]) => k !== 'domain' && k !== 'name' && typeof v !== 'object')
      .map(([k, v]) => `${k}=${v}`)
      .join('  ');
    out.push(primary ? `${primary}  ${rest}` : rest);
  }
  if (payload._creditsRemaining !== undefined) {
    out.push('', `credits remaining: ${payload._creditsRemaining}`);
  }
  return out.join('\n');
}

export async function main(argv = process.argv.slice(2)) {
  const { positional, flags } = parseArgs(argv);
  const name = positional.shift();

  if (!name || (flags.help && !name)) { console.log(usage()); return 0; }

  const command = COMMANDS.find((c) => c.name === name);
  if (!command) {
    console.error(`unknown command: ${name}`);
    console.error('run "searchcode --help" for the command list');
    return 2;
  }
  if (flags.help) { console.log(commandHelp(command)); return 0; }

  const cfg = configFromEnv();
  if (typeof flags.key === 'string') cfg.apiKey = flags.key;
  if (!cfg.apiKey) {
    console.error('no API key: set SEARCHCODE_API_KEY or pass --key');
    console.error('get one at https://searchcode.ai/');
    return 2;
  }

  const params = {};
  command.positional.forEach((param, index) => {
    if (positional[index] !== undefined) params[param.name] = positional[index];
  });
  for (const flag of command.flags) {
    if (flags[flag.name] !== undefined) params[flag.name] = flags[flag.name];
  }
  const missing = command.required.filter((n) => params[n] === undefined);
  if (missing.length) {
    console.error(`missing required: ${missing.join(', ')}`);
    console.error(`run "searchcode ${command.name} --help"`);
    return 2;
  }

  try {
    const payload = await Api[command.operation](cfg, params);
    console.log(flags.json ? JSON.stringify(payload, null, 2) : render(payload));
    return 0;
  } catch (error) {
    if (error instanceof ApiError) {
      const hint = hintFor(error.code);
      console.error(`error ${error.status} ${error.code}: ${error.message}${hint ? ` (${hint})` : ''}`);
      return 1;
    }
    console.error(`error: ${error.message || error}`);
    return 1;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().then((code) => { process.exitCode = code; });
}
