# Repository Guidelines

## Project Overview
`route-able` is a React 19 + TypeScript frontend built with Vite. The app uses TanStack Router file-based routes, TanStack Query for server state, Zustand for client/auth/feedback state, Axios for HTTP, Socket.IO for realtime flows, Ant Design plus local `Ui*` primitives for UI, and LiveKit/TensorFlow for video and AI workout experiences.

## Project Structure & Module Organization
Source lives in `src/` and follows a feature-sliced layout with ordered layer prefixes:

- `a.app`: app entrypoint, generated TanStack route tree, route files, root providers, layout, global styles, and root Zustand store.
- `b.pages`: route-level page compositions. Pages should assemble widgets/features/entities without owning reusable business logic.
- `c.widgets`: larger reusable page fragments composed from features/entities/shared UI.
- `d.features`: user actions and business flows, usually split into `api/queries`, `api/requests`, `model`, and `ui`.
- `e.entities`: domain entities, read/query APIs, entity models/types/resolvers/stores, and small entity UI.
- `f.shared`: cross-cutting API clients, config, helpers, hooks, UI primitives, and icons.

Use the `@/` alias from `tsconfig.json` for project imports. Prefer public `index.ts` exports at the slice boundary instead of deep imports, except when the existing code in that slice already uses a direct path. Keep styles beside components as `*.module.scss`; global styles and variables belong in `src/a.app/styles`.

## Layering Rules
Keep dependencies flowing downward only: `a.app -> b.pages -> c.widgets -> d.features -> e.entities -> f.shared`. Do not import pages/widgets into features or entities. Shared code must not depend on app, pages, widgets, features, or entities. Entity APIs should represent reading/fetching domain data; feature APIs should represent commands/actions that change state or start a flow.

When adding a new domain segment, mirror the existing segment shape: `api/queries` for React Query hooks, `api/requests` for Axios request functions, `model` for types/resolvers/stores/helpers, `ui` for components, and a slice `index.ts` for intended exports.

## Routing & App Wiring
Routes live in `src/a.app/routes`, not `src/routes`. TanStack Router generates `src/a.app/entrypoint/routeTree.gen.ts`; do not hand-edit generated route tree files. The root route in `src/a.app/routes/__root.tsx` owns global providers, layout, auth/subscription checks, feedback modal, and devtools. Keep route files thin and delegate screen composition to `b.pages`.

## API, Config, And State
Use `src/f.shared/api/client.ts` for HTTP calls so auth refresh and error handling interceptors stay active. Use `src/f.shared/api/socket.ts` for socket connections. Add new environment access through `src/f.shared/config/env.ts`; document any new `VITE_*` variables in `README.md`.

Server state should use TanStack Query hooks located under the relevant slice `api/queries`. Client state that must be global should be added as a typed Zustand slice and composed in `src/a.app/store/store.ts`. Keep local UI state inside components when it does not need cross-screen access.

## UI & Styling
Prefer local shared UI primitives from `src/f.shared/ui` for app-specific controls and layout. Use Ant Design components where they are already the established choice or provide significant behavior out of the box. Keep component files in PascalCase, hooks and helpers in camelCase, and request files in the existing kebab/dotted naming style. Use SCSS modules for component styling and shared variables from `src/a.app/styles/variables.scss` instead of duplicating colors/sizes.

## Build, Test, And Development Commands
- `npm run dev` or `npm start`: start Vite on port 3000.
- `npm run build`: run `vite build` and then `tsc`.
- `npm run type-check`: run TypeScript checks without bundling.
- `npm run test`: run Vitest once.
- `npm run test -- --watch`: run Vitest in watch mode.
- `npm run server`: start the JSON mock API from `db.json` on port 3005.

Run `npm run type-check` and the most relevant tests before handing off code changes. Use `npm run build` when changing routing, app setup, shared config, or production-sensitive behavior.

## Testing Guidelines
Vitest and Testing Library are the expected test stack. Put tests beside the component, hook, or model they cover and name them `*.test.ts` or `*.test.tsx`. Favor observable behavior over implementation details. Add focused coverage for routing guards, query/mutation hooks, form validation/resolvers, and business logic touched by a change. If a change cannot be tested cleanly because the existing slice has no test harness, call that out in the handoff.

## Commit & Pull Request Guidelines
Keep commits focused and use concise imperative messages consistent with the existing style, for example `add workout plan` or `refactor scss variables`. PR descriptions should explain the user-visible change, list verification commands, and include screenshots or recordings for visible UI work.

## Documentation Notes
The current `README.md` still contains generic TanStack starter text. When changing setup, routing, env vars, mock server behavior, or core product flows, update `README.md` with project-specific instructions. Keep architecture rules in this file and domain-specific notes near the relevant layer, such as `src/d.features/features.md` or `src/e.entities/entities.md`.
