### llama.cpp

- runtime used to run/execute models in a local environment. 
- optimized to run models on CPU's of everyday hardware such as Macs, Raspberry Pi's etc
- v8 engine can be used for comparison as runtime to run javascript
- uses the GGUF file format

### GGUF

- GGML Unified Format - binary format that is fast loading, cross-platform
- model file format used my llama.cpp
- contains all the weights and metadata for a language model
- tar.gz from node packages can be used for comparison (compiled package)

### ollama

- cli for downloading + running local LLM's
- runtime + model manager
- uses llama.cpp underneath the hood as runtime
- can be used to integrate with other apps
- suitable for devs to tinker and explore local LLM's
- nodejs can be used for comparison (use v8 for execution, npm for package management)

### ollama Modelfile

- similar to dockerfile, ollama's build recipe for a local LLM model
- can specify a model, how to customize it (system prompts, parameters, templates), metadata or files to include
- great for model customization and packaging for app development (e.g. agents)
- ```
  # Base model (like a FROM line in Dockerfile)
  FROM mistral

  # System prompt (sets behavior / role)
  SYSTEM "You are a concise assistant that explains things simply."

  # Optional user prompt template
  TEMPLATE "{{ .Prompt }}"

  # Model parameters (hyperparameters)
  PARAMETER temperature 0.3
  ```
  

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

### Hugging Face

- registry of models, datasets and ml associated artifacts
- provides some additional features such running models on their cloud
- npm can be considered similar (package manager)

### model/weights

- model is like a transformer function that takes the following arguments:  input, parameters, config.
- input is the user prompt
- parameters are the model's learned data represented as floating point numbers often stored in a file like gguf
- config are the model options like context window, temperature etc
- open weight models have their parameters (weights) published so that users can run the llm themselves
- chatgpt, anthropic models are not open weight and can only be used via their web app and api's
- ollama, hugging face deal only with open weighted models

### Quantization

- quantization is process of compressing a model
- weights in a model are often represented in 32bit floating point numbers.
- mistral 7b is 7 billion parameters that can be 28GB memory
- quantization reduces that to 8bit or 4bit number thus reducing size of the model and faster for inference
- this enables running LLM's on consumer hardware with a small trade-off
- quantization can have almost 95% of full model accuracy
- quantized models normally have the suffix 2k, 4k, 5k, 8k
- 8k is a safe bet the provides near full accuracy