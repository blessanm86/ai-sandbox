import express from 'express';
import { llmQueryHandler } from './handlers/llm-query';
import { pingHandler } from './handlers/ping';

const app = express();

app.get('/ping', pingHandler);
app.post('/llm-query', express.text({ type: '*/*' }), llmQueryHandler);

export default app;
