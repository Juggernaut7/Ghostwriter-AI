import type { WorkflowField, WorkflowId } from '../types/domain';

export interface WorkflowConfig {
  id: WorkflowId;
  title: string;
  description: string;
  fields: WorkflowField[];
}

export const workflows: Record<WorkflowId, WorkflowConfig> = {
  draft: {
    id: 'draft',
    title: 'Draft Studio',
    description: 'Turn a focused brief into an original, publish-ready first draft.',
    fields: [
      { key: 'topic', label: 'What are you writing about?', placeholder: 'The idea, argument, or announcement…', multiline: true },
      { key: 'audience', label: 'Audience', placeholder: 'Who should this resonate with?' },
      { key: 'format', label: 'Format', placeholder: 'Blog article, LinkedIn post, YouTube script…' },
      { key: 'tone', label: 'Voice', placeholder: 'Direct, warm, analytical…' },
      { key: 'length', label: 'Length', placeholder: 'Short, medium, or long' },
      { key: 'voice', label: 'Voice notes', placeholder: 'Optional notes to capture your style' },
    ],
  },
  rewrite: {
    id: 'rewrite',
    title: 'Rewrite Lab',
    description: 'Keep the meaning. Change the way it lands.',
    fields: [
      { key: 'text', label: 'Your text', placeholder: 'Paste the draft you want to improve…', multiline: true },
      { key: 'instruction', label: 'What should change?', placeholder: 'Make clearer, more persuasive, shorter, fix grammar…' },
      { key: 'tone', label: 'Voice', placeholder: 'Direct, warm, analytical…' },
    ],
  },
  thread: {
    id: 'thread',
    title: 'Thread Architect',
    description: 'Shape one strong idea into a thread with momentum.',
    fields: [
      { key: 'idea', label: 'Core idea', placeholder: 'What is the thread really about?', multiline: true },
      { key: 'hook', label: 'Opening hook', placeholder: 'The line that earns the next read' },
      { key: 'story', label: 'Story or context', placeholder: 'The narrative behind the idea', multiline: true },
      { key: 'evidence', label: 'Evidence', placeholder: 'Examples, proof, or key points', multiline: true },
      { key: 'cta', label: 'Call to action', placeholder: 'What should readers do next?' },
      { key: 'targetCount', label: 'Number of posts', placeholder: '8' },
      { key: 'tone', label: 'Voice', placeholder: 'Direct, warm, analytical…' },
    ],
  },
  summarize: {
    id: 'summarize',
    title: 'Summarize',
    description: 'Find the signal in long notes, transcripts, and source material.',
    fields: [
      { key: 'text', label: 'Source material', placeholder: 'Paste notes, a transcript, or an article…', multiline: true },
      { key: 'style', label: 'Summary style', placeholder: 'Executive summary, key takeaways, study notes…' },
    ],
  },
  email: {
    id: 'email',
    title: 'Email',
    description: 'Write the message you need, with the right context and tone.',
    fields: [
      { key: 'goal', label: 'What should this email accomplish?', placeholder: 'The response or action you need…', multiline: true },
      { key: 'recipient', label: 'Recipient', placeholder: 'Who is receiving this?' },
      { key: 'tone', label: 'Voice', placeholder: 'Direct, warm, analytical…' },
      { key: 'keyPoints', label: 'Key points', placeholder: 'Details the email must include', multiline: true },
      { key: 'voice', label: 'Voice notes', placeholder: 'Optional notes to capture your style' },
    ],
  },
};