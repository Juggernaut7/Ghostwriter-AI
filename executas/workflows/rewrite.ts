import type { PreparedCompletion, WorkflowInput } from '../contracts.js';
import { prepareCompletion } from '../prompts/registry.js';

export function prepareRewrite(input: WorkflowInput): PreparedCompletion {
  if (!String(input.text ?? '').trim()) throw new Error('Text is required to rewrite.');
  return prepareCompletion('rewrite', input);
}