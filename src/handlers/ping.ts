import type { Request, Response } from 'express';

export const pingHandler = (_req: Request, res: Response): Response => {
  return res.type('text/plain').send('pong');
};
