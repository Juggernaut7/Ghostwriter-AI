# Ghostwriter AI

Ghostwriter AI is an Anna App writing workspace for drafts, rewrites, X threads, summaries, and email. The React UI is TypeScript; workflow prompts and input validation run through a Node Executa. Generation uses Anna's native LLM API. The app does not use an external LLM provider or database.

## Project Structure

- `app/`: React UI, pages, reusable components, Anna runtime adapter, and client services.
- `app/services/completion.ts`: shared `generateCompletion()` service; invokes the workflow Executa, then streams from Anna LLM with a completion fallback.
- `app/services/documents.ts`: document storage calls through `anna.storage.get/set`.
- `executas/prompts/registry.ts`: centralized system prompts and workflow prompt construction.
- `executas/workflows/`: independent Draft, Rewrite, Thread, Summarize, and Email validation/preparation modules.
- `executas/ghostwriter/`: Node stdio Executa registration and entrypoint.
- `manifest.json`: Anna UI host API allowlist, app view, and required Executa.
- `app.json`: Anna app metadata; the public development slug is `ghostwriter-ai`.
- `bundle/`: generated Vite static app bundle; do not edit by hand.
- `executas/dist/`: generated JavaScript consumed by the Node Executa; do not edit by hand.
- `tests/workflows.test.mjs`: tests the compiled workflow preparation and validation paths.

## Requirements

- Node.js 22 or newer (the installed Anna CLI requires Node 22+).
- Anna CLI `@anna-ai/cli` 0.1.56, installed with the project dependencies.
- For authenticated Anna development: run `anna-app login --host https://anna.partners` once. Keep PATs and local `.anna/` files out of commits.

## Local Development

Install packages and start the standalone UI preview:

```powershell
npm install
npm run dev
```

The Vite preview is for UI work. It has no Anna host, so generation and Anna storage are unavailable and browser state is not persisted.

Build and quality checks:

```powershell
npm run typecheck
npm run build
npm test
npm run lint
npm run anna:validate -- --strict
```

`npm run build` typechecks the React app, compiles the Executa, and builds the Anna static bundle. The workflow tests cover prompt preparation and required-input validation; they do not make live Anna LLM or APS calls.

## Anna Development

Check the developer environment and authenticate:

```powershell
anna-app doctor
anna-app login --host https://anna.partners
anna-app whoami
```

Run the Anna app harness with its default storage mode:

```powershell
npm run anna:dev
```

This script passes the valid `ghostwriter-ai` slug explicitly. By default, the CLI harness uses `legacy` in-memory `runtime_state` storage; that is not APS and does not verify durable persistence.

For a real LLM bridge and APS-backed harness storage, use an authenticated CLI session and run:

```powershell
npm run anna:dev -- --storage aps
```

The CLI documents APS mode as requiring a real LLM bridge/PAT; do not combine it with `--no-llm` or `--mock-llm`. A successful local build or legacy-mode run alone does not prove real LLM generation or APS persistence.

For offline UI/Executa work without the model:

```powershell
npm run build
npm run anna:dev:offline
```

Offline mode disables LLM calls and uses legacy in-memory storage.

## Current Persistence Behavior

The UI uses Anna's native `anna.storage.get/set` Host API methods, allowed by `manifest.json`. These are Anna host calls, not `localStorage`, `sessionStorage`, IndexedDB, or an external database.

Current limitations to keep in mind:

- Storage calls omit `scope`; the Anna CLI currently defaults these calls to `app` scope. The app has not yet been converted to explicit user-scoped APS records.
- Documents are stored as one array under `ghostwriter-ai:documents:v1`, rather than independently addressable records.
- The Settings page stores writing voice as one string under `ghostwriter-ai:voice-profile:v1`; structured `WritingSample` records and a separate extracted voice profile are not implemented.
- Durable user preferences such as default tone, length, audience, and autosave preference are not implemented.
- Autosave debounces document changes by 650ms and attempts to write the complete document array. A storage error produces a toast; multi-window conflict handling and a per-document CAS strategy are not implemented.
- The current manifest grants app UI storage methods but does not declare schema-3 APS scopes. Review the installed Anna schema and declare the appropriate scope before relying on user-isolated production persistence.

Do not describe the current implementation as user-scoped persistence until the manifest, explicit scope, and authenticated APS smoke test have been updated and verified.

## Workflows And Exports

Each workflow has its own input validation module. Prompts are centralized; the UI calls the same `generateCompletion()` service for every workflow. The service requests a prepared prompt from the Node Executa, then calls `anna.llm.stream()` and falls back to `anna.llm.complete()` when streaming is unavailable. No API key from another model provider is required for the Anna-hosted path.

The editor supports word count, autosave status, copy, and Markdown, TXT, and PDF export. Writing samples can be entered in Settings; the current single-string storage format is described above.

## Publishing To Anna

Development, uploading a draft/version, and public review are separate steps. After the real Anna LLM/APS smoke tests and storage-scope work are complete, the CLI lifecycle is:

```powershell
npm run build
npm run anna:validate -- --strict
anna-app apps publish
anna-app apps status ghostwriter-ai
anna-app apps submit-review ghostwriter-ai
```

`anna-app apps publish` pushes the working draft and cuts an immutable version; it is not the same as submitting the app for review. Check `anna-app apps publish --help` and `anna-app apps submit-review --help` before publishing. Do not submit for public review until user-scoped storage and real end-to-end persistence have been verified.
