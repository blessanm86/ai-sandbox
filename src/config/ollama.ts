const defaultHost = 'http://127.0.0.1:11434';
const defaultModel = 'llama3-groq-tool-use:8b';

const ollamaHostEnv = process.env.OLLAMA_HOST?.trim();
const ollamaModelEnv = process.env.OLLAMA_MODEL?.trim();

export const ollamaConfig = {
  baseUrl: ollamaHostEnv && ollamaHostEnv.length > 0 ? ollamaHostEnv : defaultHost,
  model: ollamaModelEnv && ollamaModelEnv.length > 0 ? ollamaModelEnv : defaultModel,
} as const;

export type OllamaConfig = typeof ollamaConfig;
