import type { WorkflowName, WorkflowInput } from '../contracts.js';
import { prepareDraft } from '../workflows/draft.js';
import { prepareEmail } from '../workflows/email.js';
import { prepareRewrite } from '../workflows/rewrite.js';
import { prepareSummary } from '../workflows/summarize.js';
import { prepareThread } from '../workflows/thread.js';

const preparers: Record<WorkflowName, (input: WorkflowInput) => unknown> = {
  draft: prepareDraft,
  rewrite: prepareRewrite,
  thread: prepareThread,
  summarize: prepareSummary,
  email: prepareEmail,
};

export function prepareWorkflow(args: { workflow?: string; input?: WorkflowInput }) {
  const workflow = args.workflow as WorkflowName;
  const prepare = preparers[workflow];
  if (!prepare) throw new Error('Choose a supported writing workflow.');
  return prepare(args.input ?? {});
}