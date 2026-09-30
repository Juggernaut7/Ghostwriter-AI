import type { PreparedCompletion, WorkflowInput, WorkflowName } from '../contracts.js';

interface PromptDefinition {
  systemPrompt: string;
  maxTokens: number;
  fields: Array<[string, string]>;
}

const registry: Record<WorkflowName, PromptDefinition> = {
  draft: {
    systemPrompt: 'Write original, useful content that is specific to the brief. Follow the requested format and voice. Return only the finished content.',
    maxTokens: 1400,
    fields: [['Topic', 'topic'], ['Audience', 'audience'], ['Format', 'format'], ['Tone', 'tone'], ['Length', 'length'], ['Voice notes', 'voice']],
  },
  rewrite: {
    systemPrompt: 'Rewrite the supplied text according to the requested transformation. Preserve its meaning and factual claims. Return only the revised text.',
    maxTokens: 1200,
    fields: [['Transformation', 'instruction'], ['Tone', 'tone'], ['Text', 'text']],
  },
  thread: {
    systemPrompt: 'Create a clear, engaging X thread from the supplied material. Keep each numbered post concise, make the narrative progress naturally, and finish with the requested call to action.',
    maxTokens: 1800,
    fields: [['Core idea', 'idea'], ['Hook', 'hook'], ['Story', 'story'], ['Evidence', 'evidence'], ['Call to action', 'cta'], ['Post count', 'targetCount'], ['Tone', 'tone']],
  },
  summarize: {
    systemPrompt: 'Summarize the supplied material accurately. Keep important nuance, omit repetition, and do not introduce unsupported claims.',
    maxTokens: 700,
    fields: [['Summary style', 'style'], ['Source text', 'text']],
  },
  email: {
    systemPrompt: 'Write a polished email that meets the sender’s goal. Use an appropriate subject line, clear structure, and a natural sign-off. Return the subject and body.',
    maxTokens: 900,
    fields: [['Goal', 'goal'], ['Recipient', 'recipient'], ['Tone', 'tone'], ['Key points', 'keyPoints'], ['Voice notes', 'voice']],
  },
};

export function prepareCompletion(workflow: WorkflowName, input: WorkflowInput): PreparedCompletion {
  const definition = registry[workflow];
  if (!definition) throw new Error(`Unsupported workflow: ${workflow}`);
  const userPrompt = definition.fields
    .map(([label, key]) => `${label}: ${String(input[key] ?? '').trim() || 'Not specified'}`)
    .join('\n');

  return { workflow, systemPrompt: definition.systemPrompt, userPrompt, maxTokens: definition.maxTokens };
}