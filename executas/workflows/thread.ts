import type { PreparedCompletion, WorkflowInput } from '../contracts.js';
import { prepareCompletion } from '../prompts/registry.js';

export function prepareThread(input: WorkflowInput): PreparedCompletion {
  if (!String(input.idea ?? '').trim()) throw new Error('A core idea is required to build a thread.');
  return prepareCompletion('thread', input);
}