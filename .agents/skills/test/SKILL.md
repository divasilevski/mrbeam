---
name: test
description: Write maintainable Vitest tests for Vue components and plain functions. Use when adding or reviewing unit or component tests, deciding what deserves a test, choosing mount vs stubs, handling async, mocking auto-imported dependencies, or wiring test tooling.
---

# Vitest tests: plain units and Vue components

## Principles

- Test behavior, not implementation: a test should survive a refactor that keeps the contract.
- One behavior per test, named as a sentence; one reason to fail per test. Arrange, act, assert.
- Prefer a few high-value tests over exhaustive coverage. Coverage is a signal, not a target.
- Every test must be deterministic, isolated, and fast; no network, real storage, real timers, or sleeps.
- Prefer the lightest environment that can mount the component (`jsdom` + VTU). Booting the framework is only worth
  it when the component needs real framework context, because it adds a build to every run.

## Test value, not coverage

- Not every component needs a spec. Add a test when a regression is plausible, expensive, and hard to notice by eye.
- Worth testing: parsing and formatting, state machines and toggles, data flow through props/emits/v-model, DOM or
  canvas update contracts, and accessibility wiring users rely on.
- Not worth testing: pure template plumbing (slot pass-through, `role`/`type` attributes), library behavior (outside
  click, hover tooltips), cosmetic styling and layout, and anything already covered by types or one smoke test.
- Worth testing even without semantics: state the component exposes only through inline styles (a collapsed sheet
  height, for example). Assert the minimal properties; add a data attribute to the component if it starts to churn.
- A rarely touched, trivial primitive does not earn a spec; a small stateful or parsing unit does.
- If a component has one risky branch, cover that branch instead of writing a full prop/emit matrix.

## Choose the level

- Pure logic: plain Vitest, no mounting.
- Component contract: `mount` for the props, emits, and state users depend on.
- Integration: real children when their interaction is the behavior under test.

## Plain units

- Test inputs, return values, boundaries, and failure paths; one behavior per test.
- Use `test.each` for input matrices instead of copy-pasted cases.
- Prefer real implementations; mock only at a boundary (time, randomness, I/O, network).
- Build fixtures with factories and overrides; never share mutable data between cases.
- Plain units need no DOM, mounting, or cleanup hooks.

## What to test

- Pure functions: return values, edge cases, thrown errors.
- Component contracts: props and defaults, emits and payloads, v-model round trips, exposed state.
- Risky branches: empty value, invalid input, error path.
- Interaction that drives those contracts: typing, click, blur, keyboard.
- Accessibility only where behavior depends on it: role, accessible name, label/control wiring.

Do not test private refs, cosmetic classes, DOM shape, library internals, or exact call order unless that is the
contract. Without a role, label, or text hook, a stable structural or state class is an acceptable selector: keep it
explicit in the test name and add a data attribute to the component if that selector starts to churn.

## Mounting

- Default to `mount`; stub only heavy children or components the test build cannot resolve.
- Stubs only apply to components Vue can resolve. An unregistered global component (for example one registered by a
  framework plugin) stays a string tag and silently drops its slot; register a pass-through component instead.
- Prefer real children when their wiring is the contract.
- Auto-imported composables are bare identifiers inside `<script setup>`, so `global.mocks` never reaches them.
  Provide them through the test build, or stub them with `vi.stubGlobal`; use the build when several specs need it.
- `v-model`: assert `update:modelValue` and drive the input with `setValue`.
- Exposed methods: call them through `wrapper.vm`; never reach into child internals.
- Call `enableAutoUnmount(afterEach)` once per file that mounts, and clear `document.body` when using `attachTo`.

## Queries and assertions

- Query like a user or assistive technology: role, label, text, then attributes.
- Prefer `[role="alert"]`, `label[for]`, `aria-label`, and visible text; use a stable structural class only when the
  component exposes nothing semantic.
- Assert user-visible outcomes and emitted payloads exactly; avoid whole-tree snapshots.
- Split unrelated assertions into separate tests.

## Async and timers

- `await` every `trigger`, `setValue`, and `setProps`.
- Use `nextTick()` for state-driven DOM updates and `flushPromises()` for pending promises.
- Use fake timers only for time-dependent behavior, and restore real timers afterwards.
- Do not mix fake and real timers in one test.

## Mocking

- Mock at the boundary: HTTP, storage, time, randomness, canvas, third-party SDKs.
- `vi.mock` is hoisted; use it for modules, `vi.spyOn` for existing objects, and `vi.stubGlobal` for globals.
- Restore spies in the spec that created them.
- Never mock the unit under test; assert the mock's contract, not its call history.

## Isolation and cleanup

- Reset stores, singletons, and module-level state between tests; build data with factories and overrides.
- Scope cleanup to the spec that created the resource. A suite-wide `restoreMocks`/`vi.restoreAllMocks()` also
  detaches spies that another spec keeps at `describe` scope, so restore per spec instead.
- Global `setupFiles` is optional. With few specs keep registration, stubs, and mocks local; extract a shared helper
  only when duplication actually hurts.

## jsdom gaps

- No `ResizeObserver`: install a controllable mock with `vi.stubGlobal`, restore it afterwards. When a composable
  creates observers or listeners lazily, trigger the active (last) instance instead of asserting a count.
- No `ClipboardEvent`: synthesize a plain `Event` and define `clipboardData` on it.
- CSS is not applied, so visibility and computed styles are not assertable; assert state contracts instead.
- VTU records native DOM events in `wrapper.emitted()` as well, so do not assert it is empty after a click.

## Props vs DOM

- Some components derive behavior from props rather than the current DOM value (parsing a model on blur, for
  example). In a v-model scenario, update the props after typing; otherwise the component reads a stale value.

## Typing and tooling

- Test files often sit outside the app's tsconfig, so `describe`/`it`/`vi` and auto-import globals look missing even
  when generated declarations exist. Add a tsconfig for the test directory that extends the app's generated config
  and includes the generated auto-import declarations and global type files.
- `.vue` imports are resolved by Volar in the IDE; a plain `tsc` run is not the gate unless the project adds
  `vue-tsc`.
- Prefer project-level config over per-file hacks; document any environment change.

## Anti-patterns

- Asserting private state or component internals; cosmetic class selectors and whole-DOM snapshots.
- Arbitrary sleeps, real network, real storage, real time.
- Mocking everything and then testing the mocks; shared mutable state between tests.
- Changing production code only to satisfy a test.
- Chasing coverage percentages.

## References

- [Vue Test Utils guide](https://test-utils.vuejs.org/guide/)
- [Vitest guide](https://vitest.dev/guide/)
