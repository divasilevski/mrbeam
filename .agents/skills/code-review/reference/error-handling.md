# Error handling review

Keep this pass short. Look for failures that become invisible or corrupt state.

## Checks

- A catch that swallows an error, logs nothing, and continues is a finding when the
  caller cannot tell the operation failed.
- A broad catch around a whole feature can hide programming errors (`TypeError`,
  `ReferenceError`) as user errors. Catch at the boundary, not around everything.
- Preserve the cause. Replacing an error with a generic message is fine for the user,
  but the original must remain diagnosable (log, error state, or rethrow).
- Reset error state on success. A stale error after a successful retry is a defect.
- `setTimeout`/timer-based error clearing needs cleanup; an unmounted component must not
  write state.
- Validation that returns an error object and code that throws are two contracts. Do
  not mix them in one path; make the failure explicit.
- `NaN`/`Infinity` are not exceptions. Validate finite numbers before using them.
- Persistence and PWA failures (quota, blocked upgrade, offline) need a visible
  outcome; silently dropping a save is data loss.

## What not to report

- Retries for deterministic local computation, logging in pure helpers, or a new error
  framework.
