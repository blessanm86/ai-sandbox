import express from 'express';
import { llmQueryHandler } from './handlers/llm-query';
import { pingHandler } from './handlers/ping';

const port = Number(process.env.PORT ?? 4000);
const app = express();

app.get('/ping', pingHandler);
app.post('/llm-query', express.text({ type: '*/*' }), llmQueryHandler);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
