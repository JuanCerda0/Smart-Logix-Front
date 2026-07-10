# Smart-Logix-Front — Agent Guide

Svelte 5 + SvelteKit + TypeScript + Vite frontend. Adapter-node for Docker.

## Commands

| Command             | Purpose                                 |
| ------------------- | --------------------------------------- |
| `npm run dev`       | Start Vite dev server                   |
| `npm run build`     | Production build                        |
| `npm run check`     | `svelte-kit sync` then `svelte-check`   |
| `npm run lint`      | Prettier check + ESLint (flat config)   |
| `npm run format`    | Prettier write                          |
| `npm run test`      | `vitest --run` — runs all test projects |
| `npm run test:unit` | `vitest` (watch mode)                   |

Run `npm run check && npm run lint && npm run test` before considering work done.

## Architecture

- **Svelte 5 runes mode** forced via `svelte.config.js` (`runes: () => true`). No `$:` reactive statements.
- **`authStore`** (`src/lib/store/auth.js`) uses `$state` / `$derived` runes — the only Svelte store file.
- **`authService`** (`src/lib/components/services/auth.service.ts`) wraps `api` client, stores token in `localStorage` under `auth_token` and `auth_tenant`.
- **API base**: `VITE_BFF_URL` env var (default `http://localhost:8080`), not `PUBLIC_API_URL`.
- **Pages**: login, register, products, contacto, nosotros (all under `src/routes/`).
- **TypeScript 6**, strict mode.

## Testing

Two Vitest projects in `vite.config.ts`:

1. **`client-browser`** (Playwright, chromium, headless): matches `src/**/*.svelte.{test,spec}.{js,ts}`
2. **`unit-tests`** (jsdom): matches `src/tests/**/*.{test,spec}.{js,ts}` and `src/**/*.{test,spec}.{js,ts}`, excludes svelte test files

Setup file: `src/tests/setup.ts` (imports `@testing-library/jest-dom/vitest`).

Run a single file: `npx vitest run --project unit-tests src/tests/unit/services/auth.service.test.ts`

## Conventions

- Prettier: tabs, single quotes, no trailing commas, 100 print width.
- ESLint: flat config (`eslint.config.js`), includes `eslint-config-prettier` last.
- `svelte/no-navigation-without-resolve` is disabled globally.
- `no-undef` is disabled in ESLint (Svelte handles globals).
- Engine strict: requires Node.js matching `package-lock.json`.

## Build / Deploy

- Dockerfile: multi-stage, `node:22-bookworm-slim`, copies `build/` into runner, serves with `node index.js` on port 5173.
- `npm run prepare` runs `svelte-kit sync` (auto-runs on `npm install`).
- `.svelte-kit/` is generated — do not edit manually.
- `build/` is gitignored, produced by `npm run build`.
