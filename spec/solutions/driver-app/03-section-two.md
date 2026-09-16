# DA-03 — Section 2, Key Features

**Status:** Not started
**Component:** `src/components/solutions/driver-app/DriverAppFeatures.tsx`

- Background `--c-surface-alt`, `.sec-pad`.
- `<h2>`: `Key Features`
- The four features are rendered **inside the slider** (DA-04), not as a
  separate grid — the document places `[slider]` directly after the list.
  This section component owns the heading and mounts `SolutionSlider`.

## Feature data (verbatim, title + body)

| Title | Body |
|-------|------|
| Find Stations | Locate the nearest available swapping station. |
| Live Availability | Check station and battery availability in real time. |
| Swap History | Track previous battery swaps and usage. |
| Payments | Manage digital payments from one place. |

## Accept when

- Heading is `<h2>`; exactly four slides, copy verbatim, no fifth invented item.
