import request from 'supertest';
import { describe, expect, it } from 'vitest';
import app from '../src/app';

describe('API routes', () => {
  it('GET /ping returns pong', async () => {
    const response = await request(app).get('/ping');

    expect(response.status).toBe(200);
    expect(response.text).toBe('pong');
  });

  it('POST /llm-query echoes string input', async () => {
    const payload = 'Hello LLM';

    const response = await request(app)
      .post('/llm-query')
      .set('Content-Type', 'text/plain')
      .send(payload);

    expect(response.status).toBe(200);
    expect(response.text).toBe(payload);
  });
});
