# Repository Guidelines

## Project Structure & Module Organization
Source lives in `src/`, organized with a feature-sliced layout (`a.app`, `b.pages`, `c.widgets`, `d.features`, `e.entities`, `f.shared`). Keep entry points and router setup in `a.app`, page-level shells in `b.pages`, reusable view fragments in `c.widgets`, business flows in `d.features`, domain models in `e.entities`, and cross-cutting helpers, configs, and UI primitives in `f.shared`. Static assets stay in `public/`, while global HTML is in `index.html`. Use the `@/` alias from `tsconfig.json` for intra-project imports instead of long relative paths. Co-locate styles (`*.module.scss`) and tests with the component or module they exercise.

## Build, Test, and Development Commands
Run `npm run dev` (or `npm start`) to launch Vite on port 3000. `npm run build` performs a production bundle (`vite build`) and type-checks with `tsc`; use it before tagging releases. `npm run test` executes the Vitest suite once, and `npm run test -- --watch` keeps tests hot during development. `npm run type-check` surfaces TypeScript issues without building. `npm run server` boots the JSON mock API on port 3005 from `db.json`; keep it running when developing features that talk to the backend.

## Coding Style & Naming Conventions
The codebase is TypeScript-first with React 19 function components. Follow Prettier defaults (2-space indentation, single quotes), enforced through the flat ESLint config (`eslint.config.js`) plus `eslint-plugin-prettier`. Keep imports ordered automatically by `simple-import-sort`, and prefer named exports from feature folders. Name UI components and files in PascalCase (`MealPlanTable.tsx`), hooks in camelCase (`useMeals.ts`), and SCSS modules with `.module.scss`. Leverage shared tokens from `src/f.shared` instead of redefining constants and keep feature boundaries intact—only cross layers via the documented interfaces.

## Testing Guidelines
Vitest with `@testing-library/react` is the default stack. Add at least one focused test for each new widget, page, or feature slice; name files `Component.test.tsx` beside the implementation. Mock network calls with lightweight stubs or the JSON server, and assert observable UI behavior rather than internal state. Aim for meaningful coverage on routing guards, query logic, and form validation—call out any gaps in your PR description if coverage cannot reach new logic.

## Commit & Pull Request Guidelines
Git history favors concise, imperative messages (`add workout plan`, `refactor scss variables`); continue using a single lowercase verb phrase, optionally ending with scope details (`add meal goals feature`). Group related changes per commit, and reference issues with `#id` when relevant. Pull requests should outline the change, list testing evidence, and attach screenshots or screen recordings for visible UI updates. Confirm lint, type-check, build, and test steps locally before assigning reviewers to keep CI green.

## Local Data & Configuration Tips
Environment-specific constants belong under `src/f.shared/config`; do not hardcode secrets. When adding API clients, surface endpoints through the shared `api/` layer so they can be swapped for mocks easily. Document any new env vars in `README.md` and provide fallback defaults to keep `npm run dev` operational without extra setup.
