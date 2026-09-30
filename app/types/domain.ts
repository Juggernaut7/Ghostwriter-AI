export type WorkflowId = 'draft' | 'rewrite' | 'thread' | 'summarize' | 'email';

export type PageId = 'dashboard' | WorkflowId | 'settings';

export interface WritingDocument {
  id: string;
  title: string;
  workflow: WorkflowId;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export type WorkflowValues = Record<string, string>;

export interface WorkflowField {
  key: string;
  label: string;
  placeholder: string;
  multiline?: boolean;
}