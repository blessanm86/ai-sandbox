import type { Request, Response } from 'express';
import { z } from 'zod';
import { ollamaConfig } from '../config/ollama';
import { isOllamaError, sendOllamaChat } from '../lib/ollama-client';

const promptSchema = z
  .string({
    error: 'Request body must be text',
  })
  .trim()
  .min(1, { message: 'Prompt must not be empty' });

export const llmQueryHandler = async (req: Request, res: Response): Promise<Response> => {
  const validationResult = promptSchema.safeParse(req.body);

  if (!validationResult.success) {
    const [issue] = validationResult.error.issues;
    return res.status(400).type('text/plain').send(issue?.message ?? 'Invalid prompt');
  }

  const prompt = validationResult.data;

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
