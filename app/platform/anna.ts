export interface LlmRequest {
  messages: Array<{ role: 'user'; content: { type: 'text'; text: string } }>;
  systemPrompt: string;
  maxTokens: number;
  temperature: number;
}

export interface AnnaRuntime {
  llm: {
    stream(request: LlmRequest): AsyncIterable<LlmEvent>;
    complete(request: LlmRequest): Promise<LlmResult>;
  };
  storage: {
    get(args: { key: string }): Promise<{ value?: unknown } | unknown>;
    set(args: { key: string; value: unknown }): Promise<unknown>;
  };
  tools: {
    invoke(args: { tool_id: string; method: string; args: Record<string, unknown> }): Promise<unknown>;
  };
  window: {
    set_title(args: { title: string }): Promise<unknown>;
    ready(args?: Record<string, never>): Promise<unknown>;
  };
}

export interface LlmEvent {
  event: 'model_token' | 'complete' | 'error';
  text?: string;
  content?: { type?: string; text?: string };
  message?: string;
  code?: string | number;
}

export interface LlmResult {
  content?: { type?: string; text?: string };
}

interface AnnaRuntimeModule {
  AnnaAppRuntime: { connect(): Promise<AnnaRuntime> };
}

declare global {
  interface Window {
    ghostwriterAnna?: AnnaRuntime;
  }
}

export async function connectAnna(): Promise<AnnaRuntime | null> {
  if (window.ghostwriterAnna) return window.ghostwriterAnna;
  if (window.parent === window) return null;
  try {
    const runtimeUrl = '/static/anna-apps/_sdk/latest/index.js';
    const sdk = await import(/* @vite-ignore */ runtimeUrl) as AnnaRuntimeModule;
    const runtime = await sdk.AnnaAppRuntime.connect();
    window.ghostwriterAnna = runtime;
    await runtime.window.set_title({ title: 'Ghostwriter AI' });
    await runtime.window.ready({});
    return runtime;
  } catch {
    return null;
  }
}