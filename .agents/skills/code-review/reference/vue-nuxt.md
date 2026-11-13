# Vue and Nuxt review

## Reactivity

- Props are readonly. Mutating a prop, or an object/array received through one,
  breaks the parent contract.
- Destructuring `reactive` loses reactivity; use `toRefs` or read through the object.
  Destructuring a `ref` yields a snapshot unless you keep `.value`.
- `computed` is for derived values; `watch`/`watchEffect` are for side effects. A
  watcher that writes the state it watches can loop.
- Every external listener, observer, timer, and subscription needs cleanup. Use the
  cleanup callback, `onUnmounted`, or `onScopeDispose`; a watcher created in setup is
  disposed with the component, but any external resource it creates still needs cleanup.
- `watchEffect` at module scope lives for the module's lifetime and shares state across
  app instances. Confirm that is intended.
- `nextTick` is for DOM updates after state changes; `flush` options change when a
  watcher runs.
- When passing reactive data to an imperative library, pass `toRaw(...)` or a plain
  snapshot. Do not wrap library objects in `ref`/`reactive`.

## Components

- `<script setup lang="ts">` and Composition API only; Options API is disabled.
- Auto-imported components, composables, and Vue APIs are bare identifiers. Do not add
  redundant imports for them; do add explicit imports for modules and types.
- Props defaults for objects/arrays are factories. Required props are actually required
  at every call site.
- Emits carry the documented payload; a `v-model` round-trip updates on the documented
  event. `defineExpose` exposes only what the parent needs.
- `v-for` needs a stable key. Do not combine `v-if` and `v-for` on one element.
- Template logic stays small; move calculations to `computed`. Avoid `v-html` with
  dynamic content (see `security.md`).
- Accessibility basics: a control is a real `button`/`input`/`a` where possible, has an
  accessible name, and works from the keyboard. A `span` with `role="tab"` needs the
  full keyboard contract, not only Enter.
- `data-testid`/`data-status` are a test contract; a rename without a spec update is a
  P1.

## Size and SOLID

- A component has one reason to change. Split it when it mixes data orchestration
  with substantial markup, owns several independent UI sections, or repeats a block
  that could be a child. Entry/route components stay thin composition surfaces.
- Prefer small components plus composables over a god component. Move state and side
  effects into `useX` composables; keep the component about its contract.
- Apply SOLID as a lens, not a checklist: one responsibility; extend through
  props/slots/composition instead of editing a shared component for one caller; keep
  props/emits consistent where a component is substituted; keep props small and
  cohesive; depend on composables/adapters, not concrete globals.
- Keep components small and focused. Line count alone is not severity: report a
  large component only with a concrete cost (duplicated logic, untestable surface, a
  second reason to change, edits across unrelated sections). Severity is usually P2;
  P1 only when it breaks a contract or blocks a test.

## Nuxt

- The app is an SPA (`ssr: false`) with no server routes. Do not demand SSR, SEO,
  server endpoints, or server-side auth; their absence is intentional.
- Browser APIs belong in a `.client` plugin or behind a guard. A plugin that touches
  `window` on the server path is a defect even in an SPA build if the plugin is loaded
  during prerender.
- `process.env` is not a client-side secret store. Only public runtime config is
  exposed to the browser; never put a secret in public config, `import.meta.env`, or a
  client bundle.
- Layers have their own config and aliases. Do not reach across layers with relative
  paths; use the documented alias. Component names must stay unique across the app and
  layers.
- PWA/service worker changes are behavior changes: stale caches, `navigateFallback`,
  update prompts, and offline fallbacks need a scenario.
- IndexedDB persistence is async and can fail (quota, blocked upgrade, private mode,
  malformed stored data). A read must validate its shape; a write failure needs a
  visible outcome.
- Generated `.nuxt`/`.output` is not reviewed or edited. Config changes can affect
  build, prerender, PWA, and bundle size.

## Imperative rendering

- The rendering adapter owns the canvas/project lifecycle. Components only pass data
  and size.
- Redraw must clear or replace the previous scene; repeated draws must not accumulate
  items.
- Mouse/view handlers are global to the project. Set them once per draw or remove the
  previous one; a stale closure keeps old data alive.
- Empty or single-point data often means a zero span. Guard division by a computed
  count or a `last - first` length.
- Canvas size can be zero during mount or resize; guard it.

## Styles and tests

- Scoped styles by default; use design tokens, not raw colors. A style change is not a
  review finding unless it changes behavior, accessibility, or a documented contract.
- Test authoring detail belongs to the repository's test skill. In review, check only
  coverage of the change and test-hook updates.

## What not to report

- Options API, Pinia, "add SSR/SEO", visual taste, or a deep style/rendering refactor.
