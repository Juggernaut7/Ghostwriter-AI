import type { WorkflowId, WorkflowValues } from '../types/domain';
import type { AnnaRuntime, LlmEvent, LlmRequest } from '../platform/anna';

const WORKFLOW_EXECUTA_HANDLE = 'ghostwriter';
const LOCAL_WORKFLOW_TOOL_ID = 'tool-dev-ghostwriter-ai';

interface PreparedPrompt {
  systemPrompt: string;
  userPrompt: string;
  maxTokens: number;
}

function readPreparedPrompt(result: unknown): PreparedPrompt {
  const outer = result as { data?: unknown };
  const payload = (outer?.data ?? result) as { data?: unknown };
  const prepared = (payload?.data ?? payload) as Partial<PreparedPrompt>;
  if (!prepared.systemPrompt || !prepared.userPrompt || !prepared.maxTokens) {
    throw new Error('Anna Executa returned an invalid workflow prompt.');
  }
  return prepared as PreparedPrompt;
}

function resultText(result: unknown): string {
  const response = result as { content?: { text?: unknown } };
  if (typeof response?.content?.text !== 'string') throw new Error('Anna returned an empty completion.');
  return response.content.text;
}

async function streamWithFallback(
  anna: AnnaRuntime,
  request: LlmRequest,
  onToken: (text: string) => void,
): Promise<string> {
  let output = '';
  try {
    for await (const event of anna.llm.stream(request)) {
      if (event.event === 'error') {
        const error = new Error(event.message || 'Anna streaming failed.') as Error & { code?: string | number };
        error.code = event.code;
        throw error;
      }
      if (event.event === 'model_token' && event.text) {
        output += event.text;
        onToken(output);
      }
      if (event.event === 'complete' && !output && event.content?.text) {
        output = event.content.text;
        onToken(output);
      }
    }
    if (!output) throw new Error('Anna completed without returning text.');
    return output;
  } catch (error) {
    const code = (error as { code?: string | number }).code;
    if (code !== -32601 && code !== 'unknown_method') throw error;
    const result = await anna.llm.complete(request);
    output = resultText(result);
    onToken(output);
    return output;
  }
}

export async function generateCompletion(
  anna: AnnaRuntime,
  workflow: WorkflowId,
  input: WorkflowValues,
  onToken: (text: string) => void,
): Promise<string> {
  const raw = await anna.tools.invoke({
    tool_id: window.__ANNA_TOOL_IDS__?.[WORKFLOW_EXECUTA_HANDLE] || LOCAL_WORKFLOW_TOOL_ID,
    method: 'prepare',
    args: { workflow, input },
  });
  const prompt = readPreparedPrompt(raw);
  return streamWithFallback(anna, {
    messages: [{ role: 'user', content: { type: 'text', text: prompt.userPrompt } }],
    systemPrompt: prompt.systemPrompt,
    maxTokens: prompt.maxTokens,
    temperature: 0.72,
  }, onToken);
}

export function isLlmEvent(value: unknown): value is LlmEvent {
  return Boolean(value && typeof value === 'object' && 'event' in value);
}