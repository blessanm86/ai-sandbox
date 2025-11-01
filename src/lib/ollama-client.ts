import { ollamaConfig } from '../config/ollama';

export type OllamaRole = 'user' | 'system' | 'assistant';

export type OllamaMessage = {
  role: OllamaRole;
  content: string;
};

export type OllamaChatOptions = {
  system?: string;
  messages?: OllamaMessage[];
};

export type OllamaChatResult = {
  status: number;
  latencyMs: number;
  message: string;
  inputTokens: number | null;
  outputTokens: number | null;
  raw: unknown;
};

export type OllamaError = Error & {
  status: number;
  body: string;
};

type OllamaChatResponsePayload = {
  model: string;
  created_at: string;
  message?: {
    role: string;
    content: string;
  };
  response?: string;
  done?: boolean;
  total_duration?: number;
  prompt_eval_count?: number;
  eval_count?: number;
  [key: string]: unknown;
};

const CHAT_ENDPOINT = '/api/chat';

export async function sendOllamaChat(
  prompt: string,
  options: OllamaChatOptions = {},
): Promise<OllamaChatResult> {
  const url = new URL(CHAT_ENDPOINT, ensureTrailingSlash(ollamaConfig.baseUrl));
  const messages = buildMessages(prompt, options);

  const startedAt = Date.now();
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: ollamaConfig.model,
      messages,
      stream: false,
    }),
  });
  const latencyMs = Date.now() - startedAt;

  if (!response.ok) {
    const errorBody = await response.text();
    throw createOllamaError(response.status, errorBody);
  }

  const payload = (await response.json()) as OllamaChatResponsePayload;
  const message = payload.message?.content ?? payload.response ?? '';
  const inputTokens =
    typeof payload.prompt_eval_count === 'number' ? payload.prompt_eval_count : null;
  const outputTokens = typeof payload.eval_count === 'number' ? payload.eval_count : null;

  return {
    status: response.status,
    latencyMs,
    message,
    inputTokens,
    outputTokens,
    raw: payload,
  };
}

export const isOllamaError = (value: unknown): value is OllamaError => {
  return (
    value instanceof Error &&
    typeof (value as Partial<OllamaError>).status === 'number' &&
    typeof (value as Partial<OllamaError>).body === 'string'
  );
};

const buildMessages = (prompt: string, options: OllamaChatOptions): OllamaMessage[] => {
  const baseMessages: OllamaMessage[] = options.messages ? [...options.messages] : [];

  if (options.system) {
    baseMessages.unshift({ role: 'system', content: options.system });
  }

  return [...baseMessages, { role: 'user', content: prompt }];
};

const ensureTrailingSlash = (url: string): string => {
  return url.endsWith('/') ? url : `${url}/`;
};

const createOllamaError = (status: number, body: string): OllamaError => {
  const error = new Error(`Ollama request failed with status ${status}`) as OllamaError;
  error.name = 'OllamaError';
  error.status = status;
  error.body = body;
  return error;
};
