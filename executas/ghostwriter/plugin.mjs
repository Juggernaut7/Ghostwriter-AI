#!/usr/bin/env node
import { createInterface } from 'node:readline';
import { prepareWorkflow } from '../dist/plugin/handler.js';

const toolId = 'tool-dev-ghostwriter-ai';
const manifest = {
  display_name: 'Ghostwriter AI workflow engine',
  version: '1.0.0',
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
  const { id, method, params = {} } = envelope;
  try {
    let result;
    if (method === 'initialize') {
      result = { protocolVersion: '2.0', server_info: { name: toolId, version: manifest.version }, capabilities: {} };
    } else if (method === 'describe') {
      result = manifest;
    } else if (method === 'health') {
      result = { status: 'ready' };
    } else if (method === 'invoke' && params.tool === 'prepare') {
      result = { success: true, data: prepareWorkflow(params.arguments ?? {}) };
    } else if (method === 'invoke') {
      result = { success: false, error: `Unknown method: ${params.tool}` };
    } else {
      throw Object.assign(new Error(`Unknown RPC: ${method}`), { code: -32601 });
    }
    write({ jsonrpc: '2.0', id, result });
  } catch (error) {
    write({ jsonrpc: '2.0', id, error: { code: -32000, message: error instanceof Error ? error.message : 'Workflow preparation failed.' } });
  }
}

createInterface({ input: process.stdin }).on('line', (line) => {
  if (line.trim()) void dispatch(JSON.parse(line));
});