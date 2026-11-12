# Project conventions

Read this after the repository's own instruction files. When they conflict, the
repository wins. These are neutral rules; apply them to the diff, not to the whole
codebase.

## Commands and toolchain

- Use the repository's package manager and lockfile. Do not introduce a second package
  manager or lockfile.
- The project uses Bun. Documented checks: `bun run lint` for TS/Vue, `bun fmt` for
  md/json/css/scss, `bun run build`, `bun run test --run`, `bun run test:e2e`.
- Do not run test, lint, build, or e2e suites during review unless the user explicitly
  asks. Name the command and ask first.
- Generated and ignored output is not reviewed or edited.

## Boundaries

- Pure logic modules do not import the framework, the DOM, or app-shell APIs. Keep
  them testable in isolation.
- One adapter layer owns imperative rendering and canvas side effects. Components
  pass data and size only.
- Reuse existing utilities and primitives before adding a parallel abstraction. A new
  dependency needs a concrete need.

## State

- No state-management dependency. State lives in module-level singleton composables.
- One facade owns mutations; consumers receive readonly refs or computed values.
- Module-level state persists between tests and app instances. Specs must reset it;
  new state must be resettable.

## Components and styles

- `<script setup lang="ts">` and Composition API only.
- File name is the component name; folder names do not prefix it; components are
  auto-imported and names are unique across the app and layers.
- Prefer multi-word component names. If the linter allows a single-word name, a new
  one still needs a reason.
- Scoped SCSS by default; colors, sizes, and timing come from design tokens. No
  utility-CSS framework.
- `data-testid` and `data-status` are a test contract: change them together with the
  specs that read them.

## Tests

- Unit/component tests and browser flows live in separate suites; do not put a browser
  test in the unit suite or vice versa.
- Test authoring detail belongs to the repository's test skill. In review, only judge
  whether the changed behavior is covered and whether the test would fail on a revert.

## Code and comments

- Comments are short, in English, and explain why. Do not ask for comments that
  restate the code.
- Do not add commented-out code, dead flags, or unused parameters.
- Formatting, import order, and lint rules are the tooling's job, not review findings.

## Git

- Agents may read history and diffs. Staging, committing, branching, checking out,
  resetting, stashing, pulling, and pushing belong to the user.
- Review output is a report, not a commit or a PR comment, unless the user asks
  otherwise.
