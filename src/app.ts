import express from 'express';
import type { Request, Response } from 'express';

const app = express();

app.get('/ping', (_req: Request, res: Response) => {
  res.type('text/plain').send('pong');
});

app.post(
  '/llm-query',
  express.text({ type: '*/*' }),
  (req: Request, res: Response) => {
    if (typeof req.body !== 'string') {
      return res.status(400).type('text/plain').send('Request body must be text');
    }

    return res.type('text/plain').send(req.body);
  },
);

export default app;
