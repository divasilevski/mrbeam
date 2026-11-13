# AGENTS.md

MrBeam is a client-side calculator for flat beam systems. It computes the
structural response and plots the results as diagrams. Stack: Nuxt, Vue 3,
TypeScript, SCSS, Bun, Paper.js, PWA. Source of truth: `package.json`,
`nuxt.config.ts`, `layers/ui`.

## Commands

```bash
bun install
bun run dev
bun run build
bun run lint
bun run test --run
bun run test:e2e
bun fmt
```

Use Bun only.

## Checks

- Always run `bun run lint`; also `bun run build` when the change can affect the build.
- `bun fmt` covers the files ESLint does not format: `md`, `json`, `css`, `scss` (`bun fmt --check` is what the
  pre-commit hook runs). `ts` and `vue` stay with ESLint.
- Never run `bun run test`, `bun run test:e2e`, `vitest`, or `playwright` unless the current request explicitly asks
  for a test run ("run the tests", "make the suite pass"). A bug report, a build error, or "verify" is not such a
  request: leave the suites to the user and say you skipped them.
- To suggest a run, name the exact command and ask first.

## Layout

- `app/` — pages, components, composables, `utils/fem` (calculation), `utils/paper` (rendering), global types.
- `layers/ui/` — design system: `App*` components, SCSS variables, shared plugins and utils.
- `constants/` — layout, PWA manifest, meta, palette; `public/` — static assets; `content/` — docs page source.
- Imports: `~` and `@` resolve to `app/`, `~~` to the repository root.
- `tests/` — Vitest specs mirroring `app/` and `layers/` (`tests/app/**`, `tests/layers/**`).
- `e2e/` — Playwright specs for user flows (`e2e/support/` holds shared locators and actions).

Testing split: `tests/` is Vitest (plain units and components, run by `bun run test`), `e2e/` is Playwright (browser
flows, run by `bun run test:e2e`). A browser spec goes to `e2e/`; `tests/` is not collected by Playwright and vice versa.

## Skills

Project-local skills live in `.agents/skills/`; load the matching one before starting the task. The skill file is the
source of truth, and its `description` frontmatter defines when it applies.

| Skill                                | Use when                                                                                                                                              |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| [test](.agents/skills/test/SKILL.md) | Adding or reviewing Vitest tests for plain units and Vue components: behavior contracts, mount vs stubs, auto-import seams, async/timers, jsdom gaps. |

## Components

- File name is the component name; folder names never prefix it (`components.dirs` uses `pathPrefix: false`). Do not change that.
- Keep names unique across `app/` and `layers/ui/`; components are auto-imported, so no explicit component imports.
- Use `<script lang="ts" setup>` and Composition API only.
- Use scoped SCSS; take colors and sizes from the CSS variables in the UI layer.
- Avoid single-word names (`Beam`, `Chart`, `Input`).
- `data-testid` and `data-status` are a test contract: the `e2e/` and unit specs read them, so change an attribute together with the specs that use it.

## State and data

- No Pinia. State lives in module-level singleton composables; For example `useBeam` is the only mutation facade for units.
- Keep `utils/fem` free of Vue and Nuxt imports.
- `utils/paper` is the only place that draws on canvas; components only wire data and sizing.

## Code style

- Comments are written in English. Keep them short: one line where it fits, and say why, not what the code does.
- Check what you write against SOLID, DRY, and KISS.

## Do / Don't

Do:

- Reuse `App*` primitives and UI-layer CSS variables.
- Test behavior and risky contracts, not every component; a spec must earn its place.
- Run `bun run lint` for `ts`/`vue` and `bun fmt` for `md`/`json`/`css`/`scss` before handing off; add
  `bun run build` when the build is affected.

Don't:

- Run test suites on your own initiative, even as a verification step; the user triggers them explicitly.
- Add Tailwind, Pinia, or dependencies without a concrete need.
- Edit gitignored or generated output (`.nuxt`, `.output`, `node_modules`, coverage and auto-imports output).
- Write through git. It is read-only for agents: `status`, `diff`, `log`, `show` are fine; staging, committing, branching, checking out, resetting, stashing, pulling and pushing belong to the user.
