# Frontend security review

This project is a client-side app with no server, auth, database, or cookies. Review
the frontend threat model only. Do not report missing auth, CSRF, SQL injection, SSRF,
or server-side authorization; they do not exist here.

## Sinks

- Trace data from its source (user input, URL, stored data, third-party response) to
  its sink. No source, no finding.
- `v-html`, `innerHTML`, and `useHead({ script: [{ innerHTML }] })` execute markup.
  Dynamic content from a user, URL, storage, or API is a finding; a constant string is
  not.
- `eval`/`new Function` on input is a sink even with a character filter. Check what the
  filter misses (`constructor`, `__proto__`, unicode, length, resource exhaustion). A
  local-only self-XSS is low impact; data that can cross users or be shared is not.
- External URLs and `target="_blank"` need a safe rel and a trusted scheme; a
  user-controlled URL can become an open redirect or a script URL.
- `v-html` with a static label or symbol is usually not a finding. Say so instead of
  flagging the pattern.

## Secrets and public config

- Everything shipped to the browser is public. `NUXT_PUBLIC_*`/public runtime config
  and `VITE_*` are not secret stores.
- Never echo a secret, token, or key; name the file and line.

## Storage and PWA

- IndexedDB/localStorage data is same-origin but not trusted: validate shape on read,
  handle malformed data, and never store secrets.
- Service worker caching can serve stale or poisoned content. Treat
  `navigateFallback`, cache patterns, and update strategy as behavior changes.

## Dependencies

- A new dependency is a permanent liability. Check that the existing stack cannot do
  it, that the package is maintained, and that the lockfile diff matches the manifest.

## Severity

- P0 only with a concrete exploit path and real impact (account/data integrity, code
  execution in the app origin).
- A best-practice gap with no reachable payload is P2. Do not inflate "add CSP" or "set
  headers" without the deployment context.

## What not to report

- Server-side classes that do not apply, self-XSS reported as P0, speculative payloads,
  or static-trusted markup.
