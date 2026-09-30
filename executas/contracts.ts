export type WorkflowName = 'draft' | 'rewrite' | 'thread' | 'summarize' | 'email';

export type WorkflowInput = Record<string, string | number | undefined>;

export interface PreparedCompletion {
  workflow: WorkflowName;
  systemPrompt: string;
  userPrompt: string;
  maxTokens: number;
}

export type WorkflowPreparer = (input: WorkflowInput) => PreparedCompletion;