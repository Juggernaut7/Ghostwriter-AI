# Ghostwriter AI

Ghostwriter AI is a structured writing workspace for drafts, rewrites, X threads, summaries, and email. It runs as an Anna App, using Anna's native LLM, per-user storage, and Node Executa runtime.

## Project Layout

- `app/`: TypeScript React UI, reusable components, pages, platform adapters, and services.
- `executas/prompts/registry.ts`: the single source for workflow system prompts and prompt construction.
- `executas/workflows/`: independent, typed workflow input validation and preparation.
- `executas/ghostwriter/`: Node stdio Executa entrypoint and registration metadata.
- `manifest.json` and `app.json`: Anna permissions and app metadata.
- `bundle/`: generated Anna static SPA output.

## Development

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

The Vite preview is useful for UI work; native model and Anna storage calls require the Anna host.

```sh
npm run build
npm test
npm run lint
npm run anna:validate -- --strict
```

`npm run build` typechecks the app, compiles the Executa to `executas/dist/`, and builds the static Anna bundle to `bundle/`.

## Anna Harness

Sign in to a configured Anna developer host, then run:

```sh
npm run anna:dev
```

To run the host UI and Executa without a developer PAT, use:

```sh
npm run build
npm run anna:dev:offline
```

Offline mode disables model calls. Real generation requires Anna LLM access; the app does not ship a third-party API key or call an external model provider.

## Workflows

Draft, Rewrite, Thread, Summarize, and Email all use the shared prompt registry and the same `generateCompletion()` service. The service invokes the Node Executa for workflow validation, then streams the prepared request through Anna's LLM runtime, with a completion fallback for hosts that do not support streaming.

Documents and writing samples are saved through Anna's per-user storage API. Documents include an id, title, workflow, content, and creation/update timestamps. Exports support Markdown, plain text, and PDF.
