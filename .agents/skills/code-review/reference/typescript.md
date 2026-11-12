# TypeScript and logic review

Focus on defects that survive compilation. The project uses `strict`,
`noUncheckedIndexedAccess: false`, `noImplicitOverride`, and `verbatimModuleSyntax`.
There is no standalone type-check gate; do not report pure type nits.

## Arrays and indexes

- Empty arrays: `arr[0]`, `arr[arr.length - 1]`, `reduce` without an initial value,
  `Math.max(...arr)`, `slice(0, -1)`.
- Single-element inputs: a range whose start equals its end, a "first/last" pair that
  is the same element, a loop that assumes two entries.
- `noUncheckedIndexedAccess` is off: the compiler will not prove a bound. Prove it
  with a guard, a non-empty type, or a test.
- `sort()` mutates and sorts lexicographically by default. Check for a comparator and
  for mutation of a shared or reactive array.
- `Set`/`Map` compare object identity. A new object with the same fields is not a
  duplicate.
- Spread and `toRaw`: a shallow copy still shares nested objects; a reactive proxy
  passed to an imperative library can leak reactivity.

## Numbers

- Division by zero, zero-length spans, and empty collections produce `Infinity` or
  `NaN`; both propagate silently through UI and storage.
- `NaN` is not caught by `try/catch`. Validate with `Number.isFinite` before using a
  computed value.
- `parseFloat`/`Number` return `NaN` on bad input; check before arithmetic. `0`, `''`,
  and `NaN` are falsy in different ways.
- Use `??` when `0` or `''` is valid; `||` will replace them.
- Floating-point equality is unreliable. Use an epsilon when the contract is numeric.
- `toFixed` rounds; it does not fix accumulated error. Do not present rounded output
  as exact.

## Control flow and mutation

- Off-by-one at slice/loop boundaries, inclusive vs exclusive ranges, and
  `counter--`/`counter++` pairs.
- A loop that mutates the collection it iterates; a shared array or object mutated by
  a returned value.
- `JSON.parse(JSON.stringify(value))` drops `undefined` and functions, turns dates into
  strings and `NaN` into `null`.
- `for...in` over an array yields indexes as strings; `for...of` yields values.
- An early return that skips cleanup, state reset, or a required side effect.

## Async

- Floating promises: no `await`, no `.catch`, no `void` with a reason. `forEach` with
  an async callback awaits nothing.
- `Promise.all` rejects on the first failure; confirm that abandoning the rest is
  intended.
- A race between two calls that both write the same state; a stale closure captured
  before an await.
- Cleanup after an await: unmounted component, disposed observer, cancelled request.
  Use a flag, `AbortController`, or the framework's cleanup hook.

## Types and contracts

- `any`, `as`, `as unknown as T`, and `!` are claims. Report them only when the claim
  can be false at runtime and the false case matters.
- Optional fields that are always present in practice, or required fields that can be
  absent in persisted or external data.
- A type that says "non-empty" but has no runtime enforcement; a public function whose
  return type hides an error path.
- Duplicate ambient/global types that shadow each other; a new type that drifts from
  the existing contract.
- An enum/union that grows without updating every switch; a default branch that
  silently accepts an unknown value.

## Performance

- Flag only what you can quantify: a nested loop over user-sized input, a
  recalculation inside a render loop, an allocation per item on a hot path.
- `Math.max(...largeArray)` can overflow the call stack; `Array.includes` inside a
  loop is O(n²).
- Do not demand micro-optimization without a measured or obvious scale problem.

## What not to report

- Pure type errors the build does not gate on, style, generic "use a better type"
  advice, or a rewrite of working code.
