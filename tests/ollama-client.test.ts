import { afterEach, describe, expect, it, vi } from 'vitest';

describe('sendOllamaChat', () => {
  afterEach(() => {
    vi.resetModules();
    vi.unstubAllGlobals();
    delete process.env.OLLAMA_HOST;
    delete process.env.OLLAMA_MODEL;
  });

  it('posts prompts to the Ollama chat endpoint and returns the assistant message', async () => {
    process.env.OLLAMA_HOST = 'http://localhost:1234';
    process.env.OLLAMA_MODEL = 'test-model';

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        message: { role: 'assistant', content: 'Hello from Ollama' },
      }),
    });

    vi.stubGlobal('fetch', fetchMock);
    vi.resetModules();

    const { sendOllamaChat } = await import('../src/lib/ollama-client');
    const result = await sendOllamaChat('hi there');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];

    expect(String(url)).toBe('http://localhost:1234/api/chat');
    expect(init).toMatchObject({
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
    });

    const body = (init as { body?: string }).body;
    expect(body).toBeDefined();

    const parsedBody = JSON.parse(body as string);

    expect(parsedBody).toMatchObject({
      model: 'test-model',
      stream: false,
      messages: [{ role: 'user', content: 'hi there' }],
    });
    expect(result.message).toBe('Hello from Ollama');
    expect(result.status).toBe(200);
  });
});
