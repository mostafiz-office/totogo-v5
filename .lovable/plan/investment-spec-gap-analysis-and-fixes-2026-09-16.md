# Investment Spec — Gap Analysis and Fixes

I audited the six spec files against the real code. The specs are close to buildable, but there are 11 gaps where an AI would have to guess. This plan closes them by editing the spec files only — still no website code.

## Gaps found

**Ambiguities (the spec offers a choice instead of a decision)**

1. IN-03 footnote: the file gives two conflicting instructions for the `*` note. → Decide: show `*Minimum-ticket allocations` under the grid, nothing invented.
2. IN-03 background: "band or inner card — pick one". → Decide: full-width mint band (`--c-surface-alt`).
3. IN-05 stat icons: "optional, or drop entirely". → Decide: no icons on the numbers; numbers only.
4. IN-02 primary button label colour: "navy or white, whichever passes contrast". → Decide: navy label on green (matches the homepage buttons and passes contrast).
5. IN-05 hero image: "generate, or reuse an existing asset". → Decide: generate a new `investment-hero.jpg`; the existing assets are CTA/building shots that do not fit.

**Wrong or missing facts about the code**

6. IN-02/IN-03/IN-04 say "copy the reveal pattern". The `.reveal` / `.is-in` classes and their reduced-motion override already exist globally in `src/index.css`. → Specs should say reuse the existing class and only add the observer.
7. IN-01 suggests `react-helmet`. Nothing in the project uses it and no page sets metadata today. → Specify a `useEffect` that sets `document.title` and the description meta tag, and restores the site defaults on unmount.
8. IN-05 assumes `--pad-x` and `.sec-pad` exist — they do (confirmed), but the specs should name the exact line-level tokens so nothing new gets invented.

**Missing requirements**

9. Header links are plain `<a href>`, so the page loads fresh — the spec must require the route to answer both `/investment` and `/investment/`, and that the menu item shows its active state (`aria-current="page"`) on that page.
10. No instruction to scroll to top on entry, and no statement that the page contains only these three sections (nothing borrowed from the homepage).
11. No per-task file list and no rule to update the status table in `README.md` after each task.

## What I'll change in the spec files

- `README.md` — add a "Resolved decisions" block (items 1–5), a note that `.reveal` is global, and the rule to update the status table after each task.
- `IN-01` — replace the helmet suggestion with the exact metadata effect; add both route paths, active menu state, scroll-to-top, and the "only three sections" statement.
- `IN-02` — fix the reveal note, lock the button label colour, and state that the hero image is produced in IN-05 with a token-coloured panel in the meantime.
- `IN-03` — single footnote wording, single background choice, no icons.
- `IN-04` — fix the reveal note.
- `IN-05` — remove the reuse-or-generate fork and the optional-icons fork.
- `IN-06` — add checks for both URL spellings, the active menu state, and the fresh-load scroll position.
- New `CHECKLIST.md` — one flat pre-build/post-build checklist covering content accuracy, tokens, spacing, motion, accessibility, responsive widths, and regression guards, so each task can be ticked off.

## Technical notes

- Confirmed present: `.sec-pad`/`.sec-pad-b` with `--sec-y` (index.css:709), `--pad-x` clamp (index.css:101), global `.reveal`/`.is-in` plus reduced-motion reset (index.css:597–603, 699), shared `Button` at `src/components/ui/button.tsx`, footer at `src/components/site-footer/SiteFooter.tsx`, nav item `Investment → /investment/` in `nav-config.ts`, `isRouteActive` driving `aria-current` in `NavItemLink.tsx`.
- Confirmed absent: any route for `/investment/`, any per-page metadata mechanism, react-helmet.
