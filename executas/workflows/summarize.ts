import type { PreparedCompletion, WorkflowInput } from '../contracts.js';
import { prepareCompletion } from '../prompts/registry.js';

export function prepareSummary(input: WorkflowInput): PreparedCompletion {
  if (!String(input.text ?? '').trim()) throw new Error('Text is required to summarize.');
  return prepareCompletion('summarize', input);
}