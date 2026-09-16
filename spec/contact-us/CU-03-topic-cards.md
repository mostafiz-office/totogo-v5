# CU-03 — "How Can We Help?" topic cards

**Status:** Done

## Content (verbatim)

- Heading: **Choose What You'd Like to Talk About**
- Cards:
  1. **Driver Support** — "Questions about battery swapping, the Driver App, or using the totooGO network."
  2. **Fleet Solutions** — "Interested in moving your 2- or 3-wheeler fleet to electric."
  3. **Partnerships** — "Explore opportunities to become a swapping station or ecosystem partner."
  4. **Investment** — "Connect with our team regarding the current investment opportunity."

## Behavior

- Each card is a button/link that smooth-scrolls to `#contact-form` and pre-selects the matching "I'm Interested In" option:
  - Driver Support → "Driver Support"
  - Fleet Solutions → "Fleet Onboarding"
  - Partnerships → "Station Partnership"
  - Investment → "Investment"
- Implementation: lift a `selectedTopic` state to the page (or use a small context) so the card click sets the form's select value.

## Layout

- Desktop: 4-column grid (or 2×2 if narrow).
- Mobile: swipeable using shared `SolutionSlider` or a simple horizontal scroll-snap row — follow `spec/solutions/shared-patterns.md`.
- Each card: Lucide icon, title, body; 44px min touch target; visible focus state.

## Acceptance

- Clicking a card scrolls to the form with the right topic pre-selected.
- Cards keyboard-accessible (Enter/Space activates).
