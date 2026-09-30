import type { PreparedCompletion, WorkflowInput } from '../contracts.js';
import { prepareCompletion } from '../prompts/registry.js';

export function prepareEmail(input: WorkflowInput): PreparedCompletion {
  if (!String(input.goal ?? '').trim()) throw new Error('An email goal is required.');
  return prepareCompletion('email', input);
}