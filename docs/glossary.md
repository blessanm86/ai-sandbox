### llama.cpp

- runtime used to run/execute models in a local environment. 
- optimized to run models on CPU's of everyday hardware such as Macs, Raspberry Pi's etc
- v8 engine can be used for comparison as runtime to run javascript

### ollama

- cli for downloading + running local LLM's
- runtime + model manager
- uses llama.cpp underneath the hood as runtime
- can be used to integrate with other apps
- suitable for devs to tinker and explore local LLM's
- nodejs can be used for comparison (use v8 for execution, npm for package management)

### LM Studio

- desktop app for downloading + running local LLM's
- runtime + model manager
- uses llama.cpp underneath the hood as runtime
- suitable for people who want to easily toggle between models and test prompts and outputs
- provides a similar UX as chat gpt UI
- electron apps can be used for comparison (use node + desktop UX to provide app like experience)

### Inference

- execution of model to produce the next set of tokens from the given input/prompt
- execution of a node script can be used for comparison
- llama.cpp is an inference engine for models similar to v8 being an execution engine for javascript

### vLLM

- runtime used to run/execute models in a local/prod environments.
- similar to llama.cpp but it is optimized for max performance on GPU's
- mostly meant to be used in powerful backend systems