# Route Able Frontend

Frontend for Route Able, a fitness and coaching application with subscriptions, coach-client communication, meal and workout planning, video lessons, and AI-assisted workouts.

## Stack

- React 19 and TypeScript
- Vite
- TanStack Router with file-based routes
- TanStack Query for server state
- Zustand for global client state
- Axios for HTTP API calls
- Socket.IO for realtime chat flows
- Ant Design and local `Ui*` primitives
- LiveKit for video lessons
- TensorFlow MoveNet for pose detection in AI workout flows

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local `.env` file with the required API URL:

```bash
VITE_API_URL=http://localhost:3005
```

Start the frontend:

```bash
npm run dev
```

The Vite dev server runs on [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev` or `npm start`: start Vite on port 3000.
- `npm run build`: create a production bundle and run TypeScript checks.
- `npm run serve`: preview the production build locally.
- `npm run test`: run the Vitest suite once.
- `npm run test -- --watch`: run Vitest in watch mode.
- `npm run type-check`: run TypeScript checks without bundling.
- `npm run server`: start `json-server` from `db.json` on port 3005.

## Environment Variables

- `VITE_API_URL`: backend base URL used by Axios, Socket.IO, uploaded media URLs, and API-backed UI.
- `VITE_NODE_ENV`: used in the root route to switch production rendering behavior.

Add new environment values through `src/f.shared/config/env.ts` and document them here.

## Project Structure

The source code lives in `src/` and follows a feature-sliced layout:

- `a.app`: app entrypoint, routes, layout, root providers, global store, and global styles.
- `b.pages`: route-level page compositions.
- `c.widgets`: reusable page fragments.
- `d.features`: user actions and business flows.
- `e.entities`: domain entities, query APIs, models, and small entity UI.
- `f.shared`: API clients, config, helpers, hooks, UI primitives, and icons.

Routes are stored in `src/a.app/routes`. TanStack Router generates `src/a.app/entrypoint/routeTree.gen.ts`; do not edit that generated file manually.

See `AGENTS.md` and `docs/architecture.md` for deeper architecture rules.

## API And Realtime

Use `src/f.shared/api/client.ts` for HTTP requests so auth refresh and error handling interceptors stay applied. Use `src/f.shared/api/socket.ts` for Socket.IO connections; the current chat namespace is based on `${VITE_API_URL}/chats`.

See `docs/api-and-env.md` for API, environment, socket, LiveKit, and TensorFlow notes.

## Development Notes

- Prefer imports through the `@/` alias.
- Keep route files thin and delegate screen composition to `b.pages`.
- Put React Query hooks under the owning slice `api/queries`.
- Put request functions under the owning slice `api/requests`.
- Keep component styles beside components as `*.module.scss`.
- Use shared UI primitives from `src/f.shared/ui` when they fit existing app patterns.

## Verification

Before handing off code changes, run the most relevant checks:

```bash
npm run type-check
npm run test
```

Run `npm run build` when changing routes, app setup, shared config, or production-sensitive behavior.
