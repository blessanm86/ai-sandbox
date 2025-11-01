# 🎯 AI Sandbox — Learning Plan

This document tracks the overall learning roadmap for the *AI Sandbox* project.
Goal: build a local AI agent that can reason, call real-world tools (like a calendar), and evaluate its own performance.

---

## 🧱 Milestones Overview

### **Milestone 0 – Setup and Foundations**
- [x] Create repository and initial README ✅
- [x] Document learning goals and roadmap
- [x] Research local LLM options (Ollama, LM Studio, LM Deploy, etc.)
- [x] Set up environment (Node.js, TypeScript, dotenv, etc.)

### **Milestone 1 – Local LLM**
- [x] Install and run a local LLM (e.g., `llama3` in Ollama)
- [x] Write a simple Node.js script to send prompts and log responses
- [-] Compare performance, response time, and accuracy with remote APIs

### **Milestone 2 – Tool Calling (Calendar Integration)**
- [ ] Create a mock calendar data source (JSON or .ics)
- [ ] Implement a “tool” that fetches today’s events
- [ ] Design prompt templates that ask the model to “decide” when to use tools
- [ ] Discuss trade-offs between manual and framework-based tool orchestration

### **Milestone 3 – Agent Loop**
- [ ] Add simple reasoning loop: plan → act → observe → respond
- [ ] Experiment with lightweight JS frameworks or write custom loop logic
- [ ] Add logging for intermediate reasoning steps

### **Milestone 4 – Evaluation**
- [ ] Define test cases (e.g., “what’s on my schedule today?”)
- [ ] Record baseline outputs from the model
- [ ] Build simple eval harness (compare actual vs. expected response)
- [ ] Experiment with prompt adjustments or temperature changes

### **Stretch Goals**
- [ ] Explore Model Context Protocol (MCP)
- [ ] Try multi-agent coordination or role specialization
- [ ] Integrate small RAG (Retrieval-Augmented Generation) example

---

## 🧠 Learning Themes

1. **Local LLMs** – Running and managing models on your own machine
2. **Agentic AI** – Building systems that can reason and act
3. **MCP** – Connecting tools and models with standardized interfaces
4. **Evals** – Testing and measuring model performance
5. **RAG (future)** – Enhancing models with retrieval from external data

---

## 🧩 Tech Stack & Choices

| Area       | Preferred                 | Alternatives / Notes             |
|------------|---------------------------|----------------------------------|
| Language   | TypeScript / Node.js      | Python (for evals or frameworks) |
| Local LLM  | Ollama                    | LM Studio, vLLM                  |
| Framework  | Custom minimal agent loop | LangChain.js, AutoGPT.js         |
| Evaluation | Custom scripts            | OpenAI Evals, Promptfoo          |
| Calendar   | Local JSON mock           | Google Calendar API              |

---

## 📒 How to Use with ChatGPT / Codex

When opening a new session:
> “Refer to `docs/learning-plan.md` for the project’s full context.”

This ensures the model understands:
- The purpose of the repo
- The milestone structure
- Your learning goals and environment preferences

---

## 🪜 Next Step

Proceed to **Milestone 0** → environment setup & local LLM research.
