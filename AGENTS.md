# AGENTS.md

MrBeam is a client-side calculator for flat beam systems. It computes the
structural response and plots the results as diagrams. Stack: Nuxt, Vue 3,
TypeScript, SCSS, Bun, Paper.js, PWA. Source of truth: `package.json`,
`nuxt.config.ts`, `layers/ui`.

## Commands

```bash
bun install
bun run dev
bun run lint
bun run test --run
bun run build
```

Use Bun only.

## Layout

- `app/` — pages, components, composables, `utils/fem` (calculation), `utils/paper` (rendering), global types.
- `layers/ui/` — design system: `App*` components, SCSS variables, shared plugins and utils.
- `constants/` — layout, PWA manifest, meta, palette; `public/` — static assets; `content/` — docs page source.
- Imports: `~` and `@` resolve to `app/`, `~~` to the repository root.
- `tests/` — Vitest specs mirroring `app/` and `layers/` (`tests/app/**`, `tests/layers/**`), typed by `tests/tsconfig.json`.

## Skills

Project-local skills live in `.agents/skills/`; load the matching one before starting the task. The skill file is the
source of truth, and its `description` frontmatter defines when it applies.

| Skill | Use when |
| --- | --- |
| [test](.agents/skills/test/SKILL.md) | Adding or reviewing Vitest tests for plain units and Vue components: behavior contracts, mount vs stubs, auto-import seams, async/timers, jsdom gaps. |

## Components

- File name is the component name; folder names never prefix it (`components.dirs` uses `pathPrefix: false`). Do not change that.
- Keep names unique across `app/` and `layers/ui/`; components are auto-imported, so no explicit component imports.
- Use `<script lang="ts" setup>` and Composition API only.
- Use scoped SCSS; take colors and sizes from the CSS variables in the UI layer.
- Avoid single-word names (`Beam`, `Chart`, `Input`).

## State and data

- No Pinia. State lives in module-level singleton composables; For example `useBeam` is the only mutation facade for units.
- Keep `utils/fem` free of Vue and Nuxt imports.
- `utils/paper` is the only place that draws on canvas; components only wire data and sizing.

## Code style

- Comments are written in English.

## Do / Don't

Do:
- Reuse `App*` primitives and UI-layer CSS variables.
- Test behavior and risky contracts, not every component; a spec must earn its place.
- Run `bun run lint` and `bun run test --run` before handing off.

Don't:
- Add Tailwind, Pinia, or dependencies without a concrete need.
- Edit gitignored or generated output (`.nuxt`, `.output`, `node_modules`, coverage and auto-imports output).
