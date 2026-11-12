# code-review

A portable Agent Skill for reviewing a diff: design first, then correctness,
frontend security, tests, error handling, and blast radius. It is read-only: it
never edits code, mutates git, posts comments, or runs project test/lint/build
suites.

## Contents

```text
code-review/
├── SKILL.md
├── README.md
└── reference/
    ├── project-conventions.md
    ├── typescript.md
    ├── vue-nuxt.md
    ├── security.md
    └── error-handling.md
```

`SKILL.md` is always loaded. The reference files are loaded only when the diff
matches their signal, so a small change does not pay for the whole library.

## Install

The skill is a directory with no build step and no dependencies.

### Project-local

Copy the directory into the repository's skills directory. Keep the directory
name `code-review`: the Agent Skills specification requires it to match `name` in
the frontmatter.

```bash
mkdir -p .agents/skills
cp -R code-review .agents/skills/code-review
```

The skill is then available to agents that read project-local skills from that
directory.

### Global

Copy the same directory into the skills directory of your client. For example,
clients that read `~/.claude/skills/` use:

```bash
mkdir -p ~/.claude/skills
cp -R code-review ~/.claude/skills/code-review
```

Consult your client's documentation for its exact skill location. Do not rename
the directory.

## Use

Ask for a review in natural language; the `description` frontmatter is the
trigger.

```text
Review PR #123 against main.
```

```text
Self-review my working tree before I open the PR.
```

```text
Review the diff main...HEAD and report only P0/P1.
```

```text
Is this change safe to merge?
```

The skill accepts a PR, a branch, a commit range, or local changes. If the diff
cannot be read or is truncated, it returns `Review incomplete` instead of a clean
verdict.

## Output

The default report is compact: Overview, What's good, Findings, Verdict. A finding is
one bullet with `file:line`, a plain-language title, a 1–2 sentence explanation of what
the user sees, and a one-line fix. P0/P1 are blocking and must be confirmed;
unconfirmed findings are P2 at most and never block. For full `Location` /
`Scenario (PoC)` / `Evidence` / `Impact` / `Fix` / `Confidence`, ask for a detailed
report.

```markdown
## Overview

Adds input validation to the shared numeric helper and covers the empty case.

## What's good

The new guard fails fast and the spec covers the empty input.

## Findings

Counts: P0 0 · P1 1 · P2 0 · unconfirmed 0

### P1 — fix before merge

- **[P1] `src/helpers/scale.ts:42` — график исчезает, если две точки совпали.**
  При одинаковых координатах `end - start` равно нулю, масштаб становится
  `Infinity`, и вместо линии ничего не рисуется. Fix: вернуть пустой результат или
  нейтральный масштаб; добавить спек на одну точку.

## Verdict

- **Decision:** Request changes
- **Blocking:** P1 zero-length span
- **Reviewed:** `src/helpers/scale.ts`, its spec, and callers
- **Not reviewed:** none
```

## Customize

- Edit `reference/project-conventions.md` when the repository's rules change.
- Keep the reference set aligned with the stack actually in use. Do not add files
  for languages or frameworks the repository does not use.
- Test-writing detail belongs to the repository's test skill; this skill only
  checks whether a change is covered and whether its test hooks were updated.

## Validate

If your client ships `skills-ref`, run:

```bash
skills-ref validate .agents/skills/code-review
```

Otherwise check that `name` matches the directory, `description` is 1–1024
characters, every `reference/*.md` exists, and the body stays short.
