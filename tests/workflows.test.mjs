import assert from 'node:assert/strict';
import test from 'node:test';
import { prepareWorkflow } from '../executas/dist/plugin/handler.js';

const cases = [
  ['draft', { topic: 'A product launch', audience: 'Founders' }],
  ['rewrite', { text: 'A rough first draft', instruction: 'Make it clearer' }],
  ['thread', { idea: 'A useful lesson', targetCount: '8' }],
  ['summarize', { text: 'A long source document' }],
  ['email', { goal: 'Request a meeting', recipient: 'A partner' }],
];

for (const [workflow, input] of cases) {
  test(`${workflow} prepares a completion from the shared registry`, () => {
    const result = prepareWorkflow({ workflow, input });
    assert.equal(result.workflow, workflow);
    assert.ok(result.systemPrompt.length > 0);
    assert.ok(result.userPrompt.length > 0);
    assert.ok(result.maxTokens > 0);
  });
}

test('draft rejects a missing topic', () => {
  assert.throws(() => prepareWorkflow({ workflow: 'draft', input: {} }), /topic is required/i);
});

test('unsupported workflows fail clearly', () => {
  assert.throws(() => prepareWorkflow({ workflow: 'unknown', input: {} }), /supported writing workflow/i);
});