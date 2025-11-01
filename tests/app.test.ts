import type { Request, Response } from 'express';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { llmQueryHandler } from '../src/handlers/llm-query';
import { pingHandler } from '../src/handlers/ping';

describe('API routes', () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        message: { role: 'assistant', content: 'Stubbed response' },
        prompt_eval_count: 99,
        eval_count: 42,
      }),
    });

    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('GET /ping returns pong', () => {
    const res = createMockResponse();
    const result = pingHandler({} as Request, res);

    expect(res.getStatus()).toBe(200);
    expect(res.getType()).toBe('text/plain');
    expect(res.getBody()).toBe('pong');
    expect(result).toBe(res);
  });

  it('POST /llm-query forwards prompt to Ollama and returns JSON', async () => {
    const payload = 'Hello LLM';
    const req = { body: payload } as Request;
    const res = createMockResponse();

    await llmQueryHandler(req, res);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toBe('http://127.0.0.1:11434/api/chat');
    const body = (init as { body?: string }).body;
    expect(body).toBeDefined();
    expect(JSON.parse(body as string).messages.at(-1)?.content).toBe(payload);

    expect(res.getStatus()).toBe(200);
    expect(res.getBody()).toMatchObject({
      model: 'llama3-groq-tool-use:8b',
      message: 'Stubbed response',
      inputTokens: 99,
      outputTokens: 42,
    });
  });
});

function createMockResponse() {
  let statusCode = 200;
  let body: unknown;
  let contentType: string | undefined;

  const response = {
    status(code: number) {
      statusCode = code;
      return this;
    },
    type(value: string) {
      contentType = value;
      return this;
    },
    json(value: unknown) {
      contentType = 'application/json';
      body = value;
      return this;
    },
    send(value: unknown) {
      body = value;
      return this;
    },
    getStatus() {
      return statusCode;
    },
    getBody() {
      return body;
    },
    getType() {
      return contentType;
    },
  };

  return response as Response & {
    getStatus: () => number;
    getBody: () => unknown;
    getType: () => string | undefined;
  };
}
