import type { Request, Response } from 'express';
import { ollamaConfig } from '../config/ollama';
import { isOllamaError, sendOllamaChat } from '../lib/ollama-client';

export const llmQueryHandler = async (req: Request, res: Response): Promise<Response> => {
  if (typeof req.body !== 'string') {
    return res.status(400).type('text/plain').send('Request body must be text');
  }

  const prompt = req.body.trim();

  if (!prompt) {
    return res.status(400).type('text/plain').send('Prompt must not be empty');
  }

  try {
    const result = await sendOllamaChat(prompt);
    return res.status(200).json({
      model: ollamaConfig.model,
      latencyMs: result.latencyMs,
      message: result.message,
    });
  } catch (error) {
    if (isOllamaError(error)) {
      return res.status(502).json({
        error: 'ollama_request_failed',
        status: error.status,
        detail: error.body,
      });
    }

    console.error('Unexpected error while handling /llm-query:', error);
    return res.status(500).type('text/plain').send('Unexpected error while querying the model');
  }
};
