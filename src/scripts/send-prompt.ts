import process from 'node:process';
import { ollamaConfig } from '../config/ollama';
import { isOllamaError, sendOllamaChat } from '../lib/ollama-client';

async function main(): Promise<void> {
  const prompt = await resolvePrompt();

  if (!prompt) {
    console.error('No prompt provided. Pass text as arguments or pipe via stdin.');
    process.exit(1);
  }

  console.log(`[ollama] model=${ollamaConfig.model} url=${ollamaConfig.baseUrl}`);
  console.log(`[prompt] ${prompt}`);

  try {
    const result = await sendOllamaChat(prompt);
    console.log(`[response] status=${result.status} latency=${result.latencyMs}ms`);
    console.log(result.message);
  } catch (error) {
    if (isOllamaError(error)) {
      console.error(`[ollama-error] status=${error.status}`);
      if (error.body) {
        console.error(error.body);
      }
    } else if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Unknown error occurred while querying Ollama.');
    }
    process.exit(1);
  }
}

async function resolvePrompt(): Promise<string> {
  const argv = process.argv.slice(2);
  if (argv.length > 0) {
    return argv.join(' ').trim();
  }

  if (process.stdin.isTTY) {
    return '';
  }

  const chunks: Buffer[] = [];
  for await (const chunk of process.stdin) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk, 'utf8') : chunk);
  }

  return Buffer.concat(chunks).toString('utf8').trim();
}

void main();
