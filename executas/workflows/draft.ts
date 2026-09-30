import type { PreparedCompletion, WorkflowInput } from '../contracts.js';
import { prepareCompletion } from '../prompts/registry.js';

export function prepareDraft(input: WorkflowInput): PreparedCompletion {
  if (!String(input.topic ?? '').trim()) throw new Error('A topic is required to draft content.');
  return prepareCompletion('draft', input);
}