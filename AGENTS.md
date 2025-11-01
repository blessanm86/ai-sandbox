# Repository Guidelines

## Project Structure & Module Organization
- Root directory holds `README.md`, licensing, and repo-wide configuration.
- `docs/` captures research context; start with `docs/learning-plan.md` before adding or modifying agent logic.

## Build, Test, and Development Commands
- `pnpm install` — install dependencies defined in `package.json`.
- `pnpm dev` — launch the Express server with `tsx` for live reload while developing agents.
- `pnpm build` — compile TypeScript to `dist/` before packaging or running benchmarks.
- `pnpm test` — execute the Vitest + Supertest suite defined under `tests/`.

## Coding Style & Naming Conventions
- Write modern ES modules with 2-space indentation; run Prettier (`pnpm format`) prior to committing.
- Prefer descriptive file names in kebab-case (`calendar-tool.ts`), exported classes in PascalCase, and functions/constants in camelCase.
- Keep side-effectful configuration in `.env.local`; reference variables via a typed `config.ts` module rather than `process.env` scattered across files.

## Testing Guidelines
- Co-locate unit specs in `tests/` using the `*.test.ts` suffix; mimic prompt flows with scenario names such as `schedule-today.test.ts`.
- Use Vitest snapshot tests for agent transcripts and JSON assertions for tool outputs.
- Target >80% statement coverage for core planners and tools; document gaps in `tests/README.md`.

## Commit & Pull Request Guidelines
- Follow the existing short, imperative style (`add relevant docs`, `readme`); keep the subject ≤72 characters and describe *why* in the body when needed.
- Reference milestone IDs or doc sections (e.g., “Milestone 2 – tool calling”) to tie changes back to the roadmap.
- PRs should include: summary, testing evidence (`npm test` output), screenshots/logs for agent runs, and linked issues or TODOs from `docs/learning-plan.md`.

## Security & Configuration Tips
- Never commit `.env*` files, calendar data, or model weights; add new patterns to `.gitignore` before working with sensitive inputs.
- When experimenting with MCP servers or local LLMs, pin versions in `package.json` and record required ports in `docs/agents.md` for reproducibility.

## Important Instructions
- Always respond to the prompt with your analysis, answer or execution plan.
- Ask clarifying questions when in doubt or need more information to confirm a hypothesis
- DO NOT START CODING UNLESS EXPLICITLY ASK TO DO SO
