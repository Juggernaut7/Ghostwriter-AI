#!/usr/bin/env node
import { createInterface } from 'node:readline';
import { prepareWorkflow } from '../dist/plugin/handler.js';

const manifest = {
  name: 'ghostwriter-ai',
  display_name: 'Ghostwriter AI workflow engine',
  version: '1.0.4',
  description: 'Prepares validated prompts for Ghostwriter writing workflows.',
  host_capabilities: [],
  tools: [{
    name: 'prepare',
    description: 'Validate workflow input and prepare a completion request.',
    parameters: [
      { name: 'workflow', type: 'string', description: 'draft, rewrite, thread, summarize, or email', required: true },
      { name: 'input', type: 'object', description: 'Workflow-specific input values', required: true },
    ],
  }],
};

function write(envelope) {
  process.stdout.write(`${JSON.stringify(envelope)}\n`);
}

async function dispatch(envelope) {
  const id = envelope && typeof envelope === 'object' && !Array.isArray(envelope)
    ? envelope.id ?? null
    : null;
  try {
    if (!envelope || typeof envelope !== 'object' || Array.isArray(envelope)) {
      throw Object.assign(new Error('Invalid JSON-RPC request'), { code: -32600 });
    }
    const { method, params = {} } = envelope;
    let result;
    if (method === 'initialize') {
      result = { protocolVersion: '2.0', server_info: { name: manifest.name, version: manifest.version }, capabilities: {} };
    } else if (method === 'describe') {
      result = manifest;
    } else if (method === 'health') {
      result = { status: 'ready' };
    } else if (method === 'invoke' && params.tool === 'prepare') {
      result = { success: true, data: prepareWorkflow(params.arguments ?? {}) };
    } else if (method === 'invoke') {
      throw Object.assign(new Error(`Unknown tool: ${params.tool}`), { code: -32601 });
    } else {
      throw Object.assign(new Error(`Unknown RPC: ${method}`), { code: -32601 });
    }
    write({ jsonrpc: '2.0', id, result });
  } catch (error) {
    const code = error instanceof Error && 'code' in error && typeof error.code === 'number'
      ? error.code
      : -32000;
    write({ jsonrpc: '2.0', id, error: { code, message: error instanceof Error ? error.message : 'Workflow preparation failed.' } });
  }
}

createInterface({ input: process.stdin }).on('line', (line) => {
  if (!line.trim()) return;
  try {
    void dispatch(JSON.parse(line));
  } catch {
    write({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } });
  }
});