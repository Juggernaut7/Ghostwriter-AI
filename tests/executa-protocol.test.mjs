import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const entrypoint = process.env.GHOSTWRITER_EXECUTA_ENTRYPOINT
  ?? fileURLToPath(new URL('../executas/ghostwriter/plugin.mjs', import.meta.url));
const standaloneBinary = process.env.GHOSTWRITER_EXECUTA_BINARY === '1';

test('Executa handles multiple JSON-RPC requests in one process', () => {
  const frames = [
    { jsonrpc: '2.0', method: 'initialize', params: { protocolVersion: '2.0' }, id: 0 },
    { jsonrpc: '2.0', method: 'describe', id: 1 },
    { jsonrpc: '2.0', method: 'health', id: 2 },
    {
      jsonrpc: '2.0',
      method: 'invoke',
      params: { tool: 'prepare', arguments: { workflow: 'draft', input: { topic: 'A product launch' } } },
      id: 3,
    },
    { jsonrpc: '2.0', method: 'invoke', params: { tool: 'missing', arguments: {} }, id: 4 },
    'null',
    'not-json',
    { jsonrpc: '2.0', method: 'health', id: 5 },
  ];
  const input = `${frames.map((frame) => typeof frame === 'string' ? frame : JSON.stringify(frame)).join('\n')}\n`;
  const processResult = spawnSync(
    standaloneBinary ? entrypoint : process.execPath,
    standaloneBinary ? [] : [entrypoint],
    { input, encoding: 'utf8' },
  );

  assert.equal(processResult.error, undefined);
  assert.equal(processResult.status, 0, processResult.stderr);

  const responses = processResult.stdout.trim().split(/\r?\n/).map((line) => JSON.parse(line));
  assert.equal(responses.length, frames.length);
  assert.equal(responses[0].result.protocolVersion, '2.0');
  assert.equal(responses[0].result.server_info.name, 'ghostwriter-ai');
  assert.equal(responses[1].result.name, 'ghostwriter-ai');
  assert.equal(responses[1].result.version, '1.0.3');
  assert.deepEqual(responses[2].result, { status: 'ready' });
  assert.equal(responses[3].result.success, true);
  assert.equal(responses[4].error.code, -32601);
  assert.equal(responses[5].error.code, -32600);
  assert.equal(responses[6].error.code, -32700);
  assert.deepEqual(responses[7].result, { status: 'ready' });
});
