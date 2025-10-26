# 🧠 AI Sandbox

Experiments in building local AI agents — exploring LLMs, MCP, and agentic workflows.

---

## 🚀 About

This is a personal learning project to explore how AI agents work end-to-end — from running local LLMs to connecting real-world tools like a calendar.  
The goal is to build a simple, working agent that can answer questions like:

> “What’s on my schedule for today?”

...by reasoning, calling a local tool, and responding naturally.

---

## 🧩 Tech Stack (planned)

- **Language:** TypeScript / Node.js
- **LLMs:** Local model (e.g. Ollama, LM Studio, or OpenAI-compatible API)
- **Agent Framework:** TBD (custom or lightweight existing framework)
- **Calendar Source:** Google Calendar or local .ics file
- **Evaluation:** Custom prompts & behavioral testing

## 🛠️ Development Setup

The repo now ships with an Express + TypeScript service that can act as a lightweight agent backend.

```bash
pnpm install        # install dependencies
pnpm dev            # start the local server with live reload
```

Available routes:

- `GET /ping` → returns `pong` for health checks
- `POST /llm-query` → accepts a plain text body and echoes it back (useful for wiring future LLM pipelines)

Quality commands:

```bash
pnpm lint           # ESLint + TypeScript rules
pnpm test           # Vitest + Supertest coverage for the HTTP routes
pnpm build && pnpm start  # compile to dist/ and run with Node
```

---

## 🗺️ Milestones

- [x] **Milestone 0:** Project setup, research, environment prep
- [ ] **Milestone 1:** Run a local LLM and send simple prompts
- [ ] **Milestone 2:** Build a basic tool-calling mechanism (e.g. read from a calendar)
- [ ] **Milestone 3:** Introduce simple “agent loop” logic
- [ ] **Milestone 4:** Evaluate outputs and improve reasoning
- [ ] **Stretch Goal:** Experiment with MCP integration or multi-agent workflows

---

## 📘 Knowledge Base

- [Learning Plan](docs/learning-plan.md) — start here for the roadmap and research context
- [Glossary](docs/glossary.md) — quick definitions for recurring terms and acronyms
