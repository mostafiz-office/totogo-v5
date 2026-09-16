# Spec Audit — Website Issues (WI-01 … WI-07)

I read all 7 specs and checked them against the live code. Overall they are clear enough for an AI to execute — but 3 of them point at the wrong files, and 2 state a cause that the code does not support. Fixing those is the difference between a clean run and an AI editing dead code.

## Readiness checklist

| ID | Remark understood | Files correct | Cause verified | Testable criteria | Ready? |
|----|----|----|----|----|----|
| WI-01 | Yes | Yes | Plausible, not proven | Yes | Ready |
| WI-02 | Yes | Yes | N/A (design task) | Weak — "visually equal" is not measurable | Needs update |
| WI-03 | Yes | Yes — overlay confirmed at CTASection line 153, no mobile-only condition | Confirmed | Yes | Ready |
| WI-04 | Yes | **Wrong** | **Wrong** | Yes | Needs update |
| WI-05 | Yes | Yes | Plausible | Yes | Ready |
| WI-06 | Yes | Yes | N/A | Blocked on client direction | Blocked |
| WI-07 | Yes | **Wrong** | Unproven | Yes | Needs update |

## Problem 1 — WI-04 and WI-07 name files that are not used

`src/components/HowItWorks.tsx` imports `@/pages/how-it-works.css`. The specs send the AI to `src/components/how-it-works.css`, a different file that nothing imports. They also name `src/components/howItWorks.frame.ts` as "the scroll/frame math driving the reveal" — that file is imported only by its own test. The real component does not use it: it only moves the track horizontally and grows the green rail. An AI following these specs would edit two dead files, see no change, and start guessing.

## Problem 2 — WI-04's stated cause is wrong, and the real one is now known

The spec says the EARN text is ghosted because a scroll reveal animation never completes on mobile. There is no reveal animation on mobile: below 991px the scrolling track is hidden and a plain static list renders.

The actual cause is in `src/pages/how-it-works.css` (lines 171-174). The card colours are assigned with `nth-of-type`, but the first `div` in the mobile block is the bolt-icon heading, so the counting is off by one: step 1 gets the colour meant for step 2, step 2 gets step 3's, and step 3 gets **no background at all** — while the rule on line 174 still paints its paragraph white. White text on a white background is exactly the ghosted EARN block in the client's screenshot.

This also means the three mobile card colours are currently shifted by one from the intended mint / green / navy ramp.

## Problem 3 — WI-07 asserts no cause, which is correct, but should say so explicitly

The desktop track slides a fixed 1740px while the four columns are at least 2800px wide, so step 3 plausibly never arrives — but this is not confirmed. The spec should make "measure the real travel distance at 1280px and 1440px before changing numbers" the first step, rather than implying the fix lives in the frame-math file.

## Problem 4 — WI-02 has no measurable pass condition

"Visually equal" cannot be verified by an AI. The spec needs a concrete scale (for example: 56px mobile / 80px tablet / 112px desktop top and bottom padding on every top-level section) and a check that lists each section's computed padding.

## What I will change in the spec folder

Only the spec files — no website code.

1. **WI-04** — replace "Likely files" with `src/components/HowItWorks.tsx` and `src/pages/how-it-works.css`; replace the observed-cause paragraph with the confirmed `nth-of-type` off-by-one; add an acceptance criterion that the three mobile cards read mint / green / navy in order and every paragraph passes contrast.
2. **WI-07** — correct the file list to `src/components/HowItWorks.tsx` and `src/pages/how-it-works.css`; state the cause as unconfirmed and make measuring track travel vs. content width step one; drop the reference to the unused frame test.
3. **WI-02** — add a named spacing scale with concrete pixel values and a per-section verification table to fill in.
4. **README.md** — add a "Known code facts" section (which stylesheet is live, which files are dead, the 991px mobile breakpoint) so every future task starts from the right map, and update the WI-04 row.
5. Add a note to **WI-01** and **WI-05** that they touch the same sticky-stack variables and should be fixed together in one pass to avoid re-tuning twice.

## Answers to your questions

- **Can an AI execute these?** After the 4 corrections above, yes — for WI-01, WI-02, WI-03, WI-04, WI-05, WI-07.
- **Does anything still need you?** Only WI-06. It stays blocked until the client says polish-only or full redesign.
- **Suggested fix order:** WI-04 (confirmed cause, quick win) → WI-01 + WI-05 together → WI-03 → WI-07 → WI-02 → WI-06 once unblocked.
